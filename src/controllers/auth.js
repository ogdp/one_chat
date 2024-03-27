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
