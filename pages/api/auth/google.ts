
import GOOGLE_LOGIN_handler from "../../../_api/handlers/auth/google_login";
import connectDB from "../../../_api/middleware/mongodb";

const handler = async (req, res) => {
    if (req.method === "GET"){
        GOOGLE_LOGIN_handler(req, res)
    } else{
        res.send({message: "I Thing you did something wrong"})
    }
};

export default connectDB(handler);