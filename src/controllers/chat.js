import { createChatSchema } from "../schemas/chat.js";
import Chat from "../models/chat.js";
import User from "../models/user.js";

export const createChat = async (req, res) => {
  try {
    const { userId } = req.body;
    let chat = await Chat.find({
      isGroupChat: false,
      $and: [
        {
          users: { $elemMatch: { $eq: req.user._id } },
        },
        {
          users: { $elemMatch: { $eq: userId } },
        },
      ],
    })
      .populate("users", "-password -refreshToken")
      .populate("latestMessage");
    chat = await User.populate(chat[0], {
      path: "latestMessage.sender",
      select:
        "information.firstName information.lastName information.avatar_url email_tel",
    });
    if (chat != undefined) {
      return res.status(200).send(chat);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password -refreshToken"
        );
        return res.status(200).send(FullChat);
      } catch (error) {
        return res.status(400).send(error.message);
      }
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
