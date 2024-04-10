import Chat from "../models/chat.js";
import Message from "../models/message.js";
import User from "../models/user.js";
import { createMessageSchema } from "../schemas/message.js";

export const createMessage = async (req, res) => {
  const { error } = await createMessageSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      error: error.details.map((err) => err.message),
    });
  }
  try {
    var mess = await Message.create(req.body);
    mess = Message.findOne({ _id: mess._id })
      .populate(
        "sender",
        "information.firstName information.lastName information.avatar_url"
      )
      .populate("chat")
      .lean()
      .exec();
    mess = await User.populate(mess, {
      path: "chat.users",
      select:
        "information.firstName information.lastName information.avatar_url email_tel",
    });

    await Chat.findByIdAndUpdate(req.body.chat, {
      latestMessage: mess._id,
    });

    // ---

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
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate(
        "sender",
        "information.firstName information.lastName information.avatar_url email_tel"
      )
      .populate("chat")
      .lean()
      .exec();
    return res.status(200).send(messages);
  } catch (error) {
    return res.status(400).send(error.messages);
  }
};
