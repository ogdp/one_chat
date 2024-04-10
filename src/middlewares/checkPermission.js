import dotenv from "dotenv";
import User from "../models/user.js";
import Jwt from "jsonwebtoken";
dotenv.config();

const { JWT_SECRET_KEY } = process.env;

const tokenExistsDB = async (req, res, next) => {
  try {
    // console.log(req?.headers.cookie);
    const cookieString = req?.headers.cookie;
    const tokens = {};

    // Phân tích chuỗi cookie thành một mảng các phần
    cookieString.split(";").forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      tokens[key] = value;
    });
    const accessToken = tokens["accessToken"] || "";
    const refreshToken = tokens["refreshToken"] || "";

    // Log kết quả
    // console.log("accessToken:", accessToken);
    // console.log("refreshToken:", refreshToken);

    if (!accessToken || !refreshToken) {
      return res.status(400).json({
        error: true,
        type: "token",
        message: "Please log in to continue",
      });
    }

    const { id } = await Jwt.verify(refreshToken, JWT_SECRET_KEY);
    const { refreshTokenList } = await User.findById(id);
    const doesTokenExist = refreshTokenList.some(
      (item) => item.token === refreshToken
    );
    if (!doesTokenExist) {
      return res.status(401).json({
        error: true,
        type: "token",
        message: "Insufficient privileges for token.",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      error: true,
      type: "token",
      message: `${error.message} => Check refreshToken error`,
    });
  }
};

const getIDToken = async (token) => {
  try {
    // Verify and decode the JWT
    const decodedToken = await Jwt.verify(token, JWT_SECRET_KEY);
    const { id } = decodedToken;
    return {
      success: true,
      id,
    };
  } catch (error) {
    if (error instanceof Jwt.TokenExpiredError) {
      // Token has expired
      // console.log("Token has expired");
      return {
        error: true,
        message: "Token has expired",
      };
    } else if (error instanceof Jwt.JsonWebTokenError) {
      // Invalid token or signature
      // console.log("Invalid token or signature");
      return {
        error: true,
        message: "Invalid token or signature",
      };
    } else {
      // Other unexpected errors
      // console.log("An error occurred:", error.message);
      return {
        error: true,
        message: error.message,
      };
    }
  }
};

const checkTokenOwnership = async (req, res, next) => {
  try {
    // console.log(req?.headers.cookie);
    const cookieString = req?.headers.cookie;
    const tokens = {};
    if (!cookieString)
      return res.status(401).json({
        error: true,
        type: "token",
        message: "Please log in to continue",
      });
    // Phân tích chuỗi cookie thành một mảng các phần
    cookieString.split(";").forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      tokens[key] = value;
    });
    const accessToken = tokens["accessToken"] || "";
    const refreshToken = tokens["refreshToken"] || "";

    // Log kết quả
    // console.log("accessToken:", accessToken);
    // console.log("refreshToken:", refreshToken);

    if (!accessToken || !refreshToken) {
      return res.status(400).json({
        error: true,
        type: "token",
        message: "Please log in to continue",
      });
    }

    const token = accessToken;

    // logout
    // res.cookie("accessToken", "", { maxAge: 1 });
    // res.cookie("refreshToken", "", { maxAge: 1 });

    const resGetID = await getIDToken(token);
    if (!resGetID.id) {
      return res.status(404).json({
        error: true,
        type: "token",
        message: resGetID.message,
      });
    }

    req.uid = resGetID.id;

    const user = await User.findById(resGetID.id);
    if (!user) {
      return res.status(403).json({
        error: true,
        type: "token",
        message: "Not found user",
      });
    }
    user.password = undefined;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      error: true,
      type: "token",
      message: `${error.message} => Please check the syntax of the access code`,
    });
  }
};

export { tokenExistsDB, checkTokenOwnership };
