import dotenv from "dotenv";
import User from "../models/user.js";
import { filterValidToken } from "../controllers/jwt-service.js";
dotenv.config();

const { JWT_ACCESS_TOKEN_KEY } = process.env;

const checkPermission = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        message: "Sign in to continue",
      });
    }
    const token = req.headers.authorization.split(" ")[1];

    // Func
    const uid = await getPermissions(token);

    const user = await User.findById(uid);

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "You are not an administrator",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Check admin error",
      error: error.message,
    });
  }
};

const getPermissions = async (token) => {
  const checkToken = await filterValidToken(token);
  if (checkToken.status == false) {
    return res.status(200).json({
      status: false,
      message: "Token is invalid",
      checkToken,
    });
  }
  const { refreshToken, accessToken } = checkToken;
  let uid = 0;
  if (refreshToken !== undefined) {
    uid = refreshToken.user.id;
  }
  if (accessToken !== undefined) {
    uid = accessToken.user.id;
  }
  return uid;
};

const checkPermissionMember = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        message: "Please log in to continue",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log(req.params["uid"]);
    // Func
    const uid = await getPermissions(token);
    console.log(uid);
    const user = await User.findById(uid);
    if (user.role == "member") {
      next();
    } else {
      return res.status(403).json({
        message: "You is an member",
        permission: "member",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Check member error",
      error: error.message,
    });
  }
};
const checkTokenOwnership = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        message: "Please log in to continue",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    // Func
    const uid = await getPermissions(token);
    if (uid !== req.params["uid"]) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    const user = await User.findById(uid);
    if (!user) {
      return res.status(403).json({
        message: "Not found data",
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Please check the syntax of the access code",
      error: error.message,
    });
  }
};

export { checkPermissionMember, checkTokenOwnership };

export default checkPermission;
