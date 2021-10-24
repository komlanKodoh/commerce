import {GET_handler, POST_handler, DELETE_handler} from "../../../_api/handlers/contact_message";
import connectDB from "../../../_api/middleware/mongodb";

const handler = async (req, res) => {
  switch (req.method) {

    case "GET":
      //console.log("get")
      GET_handler(req, res)
      break;

    case "POST":
      //console.log("post")
      POST_handler(req, res)
      break;

    case "DELETE":
      //console.log("delete")
      DELETE_handler(req, res)
      break;
    
    default:
      res.send(404).send({message: "wrong method"})
  }
};

export default connectDB(handler);