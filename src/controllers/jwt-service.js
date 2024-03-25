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
        expiresIn: 1800,
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
      // console.log("Token has expired");
      return true;
    } else if (error instanceof Jwt.JsonWebTokenError) {
      // Invalid token or signature
      // console.log("Invalid token or signature");
      return false;
    } else {
      // Other unexpected errors
      // console.log("An error occurred:", error.message);
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
  if (!req.query.token) {
    return res.status(400).json({
      error: true,
      message: "No token provided",
    });
  }
  const verifyToken = await checkExpToken(req.query.token);
  const validBase64 = getPayload(req.query.token);
  if (!validBase64)
    return res.status(403).json({
      error: true,
      message: "Invalid base64 string format",
    });

  const payload = JSON.parse(
    Buffer.from(validBase64, "base64").toString("utf-8")
  );

  if (verifyToken && payload.type === "refreshToken") {
    try {
      const isMatch = await User.findById(payload.id);
      const doesTokenExist = isMatch.refreshToken.some(
        (item) => item.token === req.query.token
      );
      if (!doesTokenExist) {
        return res.status(401).json({
          error: true,
          message: "Insufficient privileges for token.",
        });
      }
      // Generate new AccessToken
      const accessToken = await signAccessToken(payload.id);
      if (accessToken == null) {
        return res.status(400).json({
          error: true,
          message: "Error genrate access token",
        });
      }

      // Generate new RefreshToken
      const { refreshToken, expRf } = await signRefreshToken(payload.id);
      if (refreshToken == null) {
        return res.status(400).json({
          message: "Error genrate refresh token",
        });
      }

      // Add token new and delete token old
      const newTokens = isMatch.refreshToken.filter(
        (item) => item.token !== req.query.token
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
      return res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(401).json({
        error: true,
        message: `${error.message} => Check refreshToken error`,
      });
    }
  } else {
    return res.status(401).json({
      error: true,
      message: "Error token",
    });
  }
};
