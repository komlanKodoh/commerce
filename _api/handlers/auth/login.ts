import Cookies from "cookies";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import User from "../../models/user";
import { createToken,createRefreshToken, verifyPassword } from "../../utils/jwt";

const handle_login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // @ts-ignore
    const user: userType = await User.findOne({
      username,
    }).lean();

    
    if (!user) {
      res.status(403).json({
        message: "Wrong email or password.",
      });
    }
    
    const passwordValid = await verifyPassword(password, user.password);
    
    if (passwordValid) {
      const { username, _id, role, cart, firstName, lastName} = user;
      const userInfo = { username, _id, role };
      const userData = { username, _id, role, cart, firstName, lastName };
      
      const token = createToken(userInfo);
      const decodedToken: { exp: number } = jwtDecode(token);
      const expiresAt = decodedToken.exp;
      
      const saved_refreshToken = await createRefreshToken(userInfo)
      
      res.setHeader("Set-Cookie", `z_model_23=${saved_refreshToken}; httpOnly ; secure; sameSite; path=/ ; Max-Age=${365 * 24 * 60 * 60}`);
      
      // delete userData.password; //!!WARNING!! DO NOT ERASE
      //console.log(token)
      res.json({
        message: "Authentication successful!",
        token,
        userData,
        expiresAt,
      });
      
    } else {
      res.status(403).json({
        message: "Wrong email or password.",
      });
    }
  } catch (err) {
    //console.log(err)
    return res.json({ message: "Something went wrong." });
  }
};

export default handle_login;
