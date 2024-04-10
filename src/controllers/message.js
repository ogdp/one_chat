import Message from "../models/message.js";
import { createMessageSchema } from "../schemas/message.js";

export const createMessage = async (req, res) => {
  try {
    const { error } = await createMessageSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }
    const mess = await Message.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Send message successfully",
      mess,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const getMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const mess = await Message.find({ chatId });
    if (!mess) {
      return res.status(400).json({
        error: true,
        message: "Get message failed",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Get message successfully",
      mess,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
