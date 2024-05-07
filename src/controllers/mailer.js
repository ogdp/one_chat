import nodemailer from "nodemailer";
import { formChangePassword } from "../views/mailer.js";
import { generateRandomCode } from "../utils/randomCode.js";
import dotenv from "dotenv";
import Jwt from "jsonwebtoken";
import { isValidEmail } from "../utils/functions.js";
import User from "../models/user.js";
dotenv.config();

// Bật 2FA => Phần tìm kiếm trong cài đặt tìm: "Mật khẩu ứng dụng"
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "d9deed@gmail.com",
    pass: "dofz ppfb jwxd chia",
  },
});

export const sendCodeResetPassword = async (name, email, randomCode) => {
  await transporter.sendMail({
    from: "d9deed@gmail.com",
    to: email,
    subject: "Thay đổi mật khẩu",
    text: `Chào bạn, ${name}`,
    html: formChangePassword(name, randomCode),
  });
};

// Đổi mật khẩu
export const getCode = async (req, res) => {
  if (!isValidEmail(req.user.email_tel))
    return res.status(401).json({
      error: true,
      message: "Invalid email address",
    });
  const randomCode = generateRandomCode(6);

  sendCodeResetPassword(
    String(req.user.information.firstName),
    String(req.user.email_tel),
    randomCode
  );
  const code = Jwt.sign({ code: randomCode }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5m",
  });
  try {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { code: code },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Send code successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Update code failed",
    });
  }
};
