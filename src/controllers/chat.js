import { createChatSchema } from "../schemas/chat.js";
import Chat from "../models/chat.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import Message from "../models/message.js";

export const createChat = async (req, res) => {
  try {
    const { error } = await createChatSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }
    const { userId } = req.body;

    if (userId == new Object(req.user._id).toString()) {
      return res.status(400).json({
        error: true,
        message: "user Id and req.user_id are the same",
      });
    }
    const validId = await mongoose.Types.ObjectId.isValid(userId);
    if (!validId) {
      return res.status(400).json({
        error: "Valid Types.ObjectId 'userId'",
      });
    }
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
    if (chat !== undefined) {
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
          // Tìm kiếm tất cả loại trừ id của người $ne
          match: { _id: { $ne: req.user._id } },
          select: `-password -refreshToken`,
        },
        {
          path: "latestMessage",
          match: { deletedUser: { $nin: [req.user._id] } },
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

export const searchChat = async (req, res) => {
  try {
    // {{host}}/api/chats/search?key=duc&_sort=updatedAt&_order=desc
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
          match: {
            // Tìm kiếm tất cả loại trừ id của người $ne
            _id: { $ne: req.user._id },
            // Hoặc có lastName hoặc có firstName giống key cần tìm
            $or: [
              { "information.lastName": new RegExp(req.query.key, "i") },
              { "information.firstName": new RegExp(req.query.key, "i") },
            ],
          },
          select: `-password -refreshToken`,
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
    await Chat.paginate(
      {
        users: { $elemMatch: { $eq: req.user._id } },
      },
      options
    ).then(function (result) {
      const filteredDocs = result.docs.filter((doc) => doc.users.length > 0);
      result.docs = filteredDocs;
      result.totalDocs = filteredDocs.length;
      return res.status(200).send(result);
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const removeChat = async (req, res) => {
  try {
    // Lấy tất cả đoạn chat của user
    const {
      _page = 1,
      _order = "asc",
      _limit = 20000,
      _sort = "updatedAt",
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? 1 : -1,
      },
      populate: [
        {
          path: "users",
          // Tìm kiếm tất cả loại trừ id của người $ne
          match: { _id: { $ne: req.user._id } },
          select: `-password -refreshToken`,
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

    const checkIdChat = chat.docs.find((doc) => doc._id == req.params.idChat);

    if (checkIdChat === undefined)
      return res.status(404).json({
        error: true,
        message: "Chat room not found",
      });
    // Push uid to deletedUser
    await Message.updateMany(
      { chat: checkIdChat._id },
      // Thêm uid nếu đã tồn tại nó sẽ không thêm nữa
      { $addToSet: { deletedUser: req.user._id } },
      {
        new: true,
      }
    );

    // Delete chat deletedUser.length == 2
    const findLength = await Message.deleteMany({ deletedUser: { $size: 2 } });
    return res.status(200).json({
      success: true,
      message: "Deleted chat room successfully !",
      findLength,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};
