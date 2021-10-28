import { string_and_array_to_array } from "../../../shared/UtilityFunctions";
import Product from "../../models/Product";
import cloudinary from "../../utils/cloudinary";

const handle_get = async (req, res) => {
  const query = req.query;
  const error = [];

  if (query.representation == "all") {
    const products = await Product.find(
      { representation: { $nin: ["none", "hot deals"] } },
      query.field
    )
      .limit(query.limit)
      .lean()
      .catch((err) => error.push(err));

    console.log("the products to come are ", products);
    return res.json({
      products,
      error,
    });
  }
  const representation = string_and_array_to_array(query.representation) || [];

  const _promises = representation.map(async (rpr) => {
    return await Product.findOne({ representation: rpr }, query.field)
      .lean()
      .catch((err) => error.push(err));
  });

  const products = await Promise.all(_promises);
  const finalProducts = [];

  const missingRepresentation = [];

  products.forEach((p, index) => {
    if (!p) missingRepresentation.push(representation[index]);
    else finalProducts.push(p);
  });

  if (missingRepresentation.length > 0) {
    //console.log(missingRepresentation)
    const _newPromises = missingRepresentation.map(async (rpr) => {
      return await Product.findOne(
        { categories: { $all: rpr.split(" ") } },
        query.field
      ).catch((err) => error.push(err));
    });

    let missingProducts = await Promise.all(_newPromises);
    missingProducts = [...missingProducts]
      .filter((e) => e) //filters the product that are not defined;
      //@ts-ignore
      .map(({ _doc: product }, index) => {
        if (!product) return;
        return { ...product, representation: missingRepresentation[index] };
      });
    //console.log(missingProducts)
    finalProducts.push(...missingProducts);
  }

  res.json({
    products: finalProducts,
    error,
  });
};

export default handle_get;