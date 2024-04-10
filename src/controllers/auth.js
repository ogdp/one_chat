import User from "../models/user.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { signinSchema, signupSchema } from "../schemas/auth.js";
import { signAccessToken, signRefreshToken } from "./jwt-service.js";
dotenv.config();
export const signup = async (req, res) => {
  try {
    const { error } = await signupSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }
    const userExist = await User.findOne({
      email_tel: req.body.email_tel,
    });
    if (userExist) {
      return res.status(400).json({
        message: "Email or phone number already exists",
      });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;
    const user = await User.create(req.body);
    user.password = undefined;
    return res.status(200).json({
      message: "Create account success",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const signin = async (req, res) => {
  try {
    const { error } = await signinSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }
    const user = await User.findOne({
      email_tel: req.body.email_tel,
    });
    if (!user) {
      return res.status(400).json({
        message: "Email or phone number does not exist",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Password does not match",
      });
    }
    // True

    const accessToken = await signAccessToken(user.id);
    if (accessToken == null) {
      return res.status(400).json({
        message: "Error genrate access token",
      });
    }
    const { refreshToken, expRf } = await signRefreshToken(user.id);
    // console.log(expRf);
    if (refreshToken == null) {
      return res.status(400).json({
        message: "Error genrate refresh token",
      });
    }

    // Add the refresh token to User DATABASE before login
    const newArrRfToken = [
      ...user.refreshToken,
      { key: expRf.exp, token: refreshToken },
    ];
    const userNew = await User.findOneAndUpdate(
      { email_tel: req.body.email_tel },
      {
        refreshToken: newArrRfToken,
      },
      { new: true }
    );
    // ==
    userNew.password = undefined;
    userNew.refreshToken = undefined;
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "Signed successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
      userNew,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
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
    // const accessToken = tokens["accessToken"] || "";
    const refreshToken = tokens["refreshToken"] || "";

    // console.log(req.user._id.toString());

    const isMatch = await User.findOne({ _id: req.user._id });

    // Add token new and delete token old
    const removeTokens = isMatch.refreshToken.filter(
      (item) => item.token !== refreshToken
    );
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        refreshToken: removeTokens,
      },
      { new: true }
    );

    res.cookie("accessToken", "", { httpOnly: true, maxAge: 1 });
    res.cookie("refreshToken", "", { httpOnly: true, maxAge: 1 });

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};
