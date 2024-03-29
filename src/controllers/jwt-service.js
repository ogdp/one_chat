import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Buffer } from "buffer";
import User from "../models/user.js";
dotenv.config();

const { JWT_SECRET_KEY } = process.env;

export const signAccessToken = async (userId) => {
  try {
    const accessToken = await Jwt.sign(
      { id: userId, type: "accessToken" },
      JWT_SECRET_KEY,
      {
        expiresIn: 3600,
      }
    );
    return accessToken;
  } catch (error) {
    return null;
  }
};
export const signRefreshToken = async (userId) => {
  try {
    const refreshToken = await Jwt.sign(
      { id: userId, type: "refreshToken" },
      JWT_SECRET_KEY,
      {
        expiresIn: 604800,
      }
    );
    const expRf = await Jwt.verify(refreshToken, JWT_SECRET_KEY);
    return { refreshToken, expRf };
  } catch (error) {
    console.log(error);
    return null;
  }
};

// generateToken ---------------

const checkExpToken = async (token) => {
  try {
    // Verify and decode the JWT
    const decodedToken = await Jwt.verify(token, JWT_SECRET_KEY);
    return true;
    // Token is valid, continue with the application logic
  } catch (error) {
    if (error instanceof Jwt.TokenExpiredError) {
      // Token has expired
      console.log("Token has expired");
      return true;
    } else if (error instanceof Jwt.JsonWebTokenError) {
      // Invalid token or signature
      console.log("Invalid token or signature");
      return false;
    } else {
      // Other unexpected errors
      console.log("An error occurred:", error.message);
      return false;
    }
  }
};
const getPayload = (base64String) => {
  if (!base64String) return false;
  const parts = base64String.split(".");
  if (parts.length !== 3) return false;
  return parts[1];
};

export const generateToken = async (req, res) => {
  // console.log(req?.headers.cookie);
  const cookieString = req?.headers.cookie;
  const tokens = {};

  // Phân tích chuỗi cookie thành một mảng các phần
  cookieString.split(";").forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    tokens[key] = value;
  });
  const old_accessToken = tokens["accessToken"] || "";
  const old_refreshToken = tokens["refreshToken"] || "";

  // Log kết quả
  // console.log("old_accessToken:", accessToken);
  // console.log("old_refreshToken:", refreshToken);

  if (!old_accessToken || !old_refreshToken) {
    return res.status(400).json({
      error: true,
      type: "token",
      message: "Please log in to continue",
    });
  }

  const verifyToken = await checkExpToken(old_refreshToken);
  const validBase64 = getPayload(old_refreshToken);
  if (!validBase64)
    return res.status(403).json({
      error: true,
      type: "token",
      message: "Invalid base64 string format",
    });

  const payload = JSON.parse(
    Buffer.from(validBase64, "base64").toString("utf-8")
  );

  if (verifyToken && payload.type === "refreshToken") {
    try {
      const isMatch = await User.findById(payload.id);
      const doesTokenExist = isMatch.refreshToken.some(
        (item) => item.token === old_refreshToken
      );
      if (!doesTokenExist) {
        return res.status(401).json({
          error: true,
          type: "token",
          message: "Insufficient privileges for token.",
        });
      }
      // Generate new AccessToken
      const accessToken = await signAccessToken(payload.id);
      if (accessToken == null) {
        return res.status(400).json({
          error: true,
          type: "token",
          message: "Error genrate access token",
        });
      }

      // Generate new RefreshToken
      const { refreshToken, expRf } = await signRefreshToken(payload.id);
      if (refreshToken == null) {
        return res.status(400).json({
          error: true,
          type: "token",
          message: "Error genrate refresh token",
        });
      }

      // Add token new and delete token old
      const newTokens = isMatch.refreshToken.filter(
        (item) => item.token !== old_refreshToken
      );
      const newArrRfToken = [
        ...newTokens,
        { key: expRf.exp, token: refreshToken },
      ];

      await User.findOneAndUpdate(
        { _id: payload.id },
        {
          refreshToken: newArrRfToken,
        },
        { new: true }
      );
      //

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 3600000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 604800000,
      });

      return res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(401).json({
        error: true,
        type: "token",
        message: `${error.message} => Check refreshToken error`,
      });
    }
  } else {
    return res.status(401).json({
      error: true,
      type: "token",
      message: "Error token",
    });
  }
};
