import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/find.module.css";
import React, { useState, useEffect } from "react";
import PageIndex from "../../component/pagination";
import ActiveFilter from "../../component/ActiveFilters";
import FilterOverlay from "../../component/FilterOverlay";
import ProductListGrid from "../../component/ProductList-grid";
import MoreProduct from "../../component/ProductList-flex/preset";
import FindContext, { useFindContext } from "../../Contexts/FindContext";
import Explore_SectionTitle from "../../component/Explore_SectionTitle";
import { getRelated } from "../../component/Layout/NavBar/navBarSections";
import { string_and_array_to_array } from "../../shared/UtilityFunctions";
import FilterContainer from "../../component/FilterContainer";
import { fetchNavigation } from "../../shared/shared_functions";
import { TextAlignment } from "@cloudinary/base/qualifiers/textAlignment";
import { useFilterContext } from "../../Contexts/GlobalContext";

const fetcher = (url) => fetch(url).then((res) => res.json());

const createUrl = (_categories, filters) => {
  if (!_categories) return;

  const categories = string_and_array_to_array(_categories).filter(
    (category) => category != "all"
  );
  const categoriesQuery = categories
    .map((category) => `categories=${category}`)
    .join("&");

  const filterQuery = Object.keys(filters)
    .map((filter) => {
      switch (filter) {
        case "price":
          return `price=${filters["price"][1] + "to" + filters.price[3]}`;
        default:
          return Object.keys(filters[filter])
            .map((choseFilter) => `${filter}=${choseFilter}`)
            .join("&");
      }
    })
    .join("&");

  return categoriesQuery + "&" + filterQuery;
};

function FindContent() {
  const router = useRouter();
  const categories = router.query.categories;
  const page = router.query.page;

  const [displayType, setDisplayType] = useState<"single" | "double">(
    "double" || "single"
  );

  const filters = useFilterContext();
  // const [page, setPage] = useState<number>(1);
  const [areMoreProduct, setAreMoreProduct] = useState(false);
  const [products, setProducts] = useState(
    Array.from({ length: 10 }).map((e) => ({ price: 100 }))
  );

  const [relatedItems, setRelatedItems] = useState([
    { representation: "x" },
    { representation: "x" },
  ]);
  // console.log("the categories are ", categories)
  useEffect(() => {
    (async () => {
      if (!categories) return;

      await fetchNavigation(categories, setRelatedItems);
    })();
  }, [categories]);

  useEffect(() => {
    (async () => {
      if (!categories) {
        router.push(
          {
            pathname: router.pathname,
            query: { ...router.query, categories: "all" },
          },
          undefined,
          { shallow: true }
        );
      }
      // if (!filters.value) return;

      const query = createUrl(categories, filters.value);

      const beginningTime = new Date().getTime();
      // @ts-ignore
      const { data } = await axios
        .get(
          `/api/product?${query}&page=${
            page || "1"
          }&limit=20&field=_id&field=productName&field=price&field=description&field=pr_image_url`
        )
        .catch((err) => console.log(err));

      const timeSpanned = new Date().getTime() - beginningTime;

      if (timeSpanned <= 200) {
        await new Promise((resolve, eject) => {
          setTimeout(() => resolve("nothing"), timeSpanned);
        });
      }

      setProducts(data.products);
      setAreMoreProduct(data.more);
    })();
  }, [filters.value, categories, page]);

  const setPage = (newPage) => {
    router.push(
      {
        pathname: "/find",
        query: { ...router.query, page: newPage },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <title>Trouver toutes sortes de produits</title>
      </Head>

      <div className="container">
        <Explore_SectionTitle categories={categories} />
      </div>

      <div className="sm">
        <FilterOverlay />
      </div>

      <ActiveFilter displayType={displayType} setDisplayType={setDisplayType} />

      <main className={styles.container}>
        <div className="big" style={{ marginLeft: "var(--margin)" }}>
          <FilterContainer
            key="45"
            showApplyFilter={false}
            applyFilterSideEffect={() => console.log(4)}
            defaultOpened={["color"]}
            maxOpened={3}
          />
        </div>
        <div>
          {products.length === 0 && (
            <div
              style={{ textAlign: "center", marginTop: "var(--larger-margin)" }}
            >
              Auncun articles correspondant
            </div>
          )}
          <ProductListGrid
            displayType={displayType}
            aspect_ratio={undefined}
            items={products}
          />
        </div>
      </main>

      <div className="flex">
        <PageIndex
          activePage={page || "1"}
          setPage={setPage}
          more={areMoreProduct}
        />
      </div>

      <MoreProduct title={"similaire"} items={relatedItems} />
    </div>
  );
}

const Find = () => {
  return (
    <FindContext>
      <FindContent />
    </FindContext>
  );
};

export default Find;
