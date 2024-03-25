import dotenv from "dotenv";
import User from "../models/user.js";
import Jwt from "jsonwebtoken";
dotenv.config();

const { JWT_SECRET_KEY } = process.env;

const tokenExistsDB = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        error: true,
        message: "Sign in to continue",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const { id } = await Jwt.verify(token, JWT_SECRET_KEY);
    const { refreshToken } = await User.findById(id);
    const doesTokenExist = refreshToken.some((item) => item.token === token);
    if (!doesTokenExist) {
      return res.status(401).json({
        error: true,
        message: "Insufficient privileges for token.",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: `${error.message} => Check refreshToken error`,
    });
  }
};

const getIDToken = async (token) => {
  try {
    // Verify and decode the JWT
    const decodedToken = await Jwt.verify(token, JWT_SECRET_KEY);
    console.log(decodedToken);
    const { id } = decodedToken;
    return id;
  } catch (error) {
    return false;
  }
};

const checkTokenOwnership = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        error: true,
        message: "Please log in to continue",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const uid = await getIDToken(token);
    console.log("uid", uid);

    // Func

    if (uid !== req.params["uid"]) {
      return res.status(403).json({
        error: true,
        message: "Access denied",
      });
    }
    const user = await User.findById(uid);
    if (!user) {
      return res.status(403).json({
        error: true,
        message: "Not found data",
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({
      error: true,
      message: `${error.message} => Please check the syntax of the access code`,
    });
  }
};

export { tokenExistsDB, checkTokenOwnership };
