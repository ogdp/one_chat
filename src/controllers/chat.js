import { createChatSchema } from "../schemas/chat.js";
import Chat from "../models/chat.js";
import User from "../models/user.js";
import { populate } from "dotenv";

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

export const getAllChatUser = async (req, res) => {
  try {
    // {{host}}/api/chats?_sort=updatedAt&_order=desc
    const {
      _page = 1,
      _order = "asc",
      _limit = 20,
      _sort = "updatedAt",
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? -1 : 1,
      },
      populate: [
        {
          path: "users",
          select: "-password -refreshToken",
        },
        {
          path: "latestMessage",
          populate: [
            {
              path: "sender",
              select: "-password -refreshToken",
            },
          ],
        },
      ],
    };
    const chat = await Chat.paginate(
      { users: { $elemMatch: { $eq: req.user._id } } },
      options
    );
    return res.status(200).send(chat);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
