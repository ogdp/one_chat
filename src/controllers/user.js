import User from "../models/user.js";
import { userSchema, createUserSchema } from "../schemas/user.js";
import bcrypt from "bcryptjs";

export const getAll = async (req, res) => {
  try {
    const {
      _page = 1,
      _order = "asc",
      _sort = "createdAt",
      _limit = 10,
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? 1 : -1,
      },
    };
    const user = await User.paginate({}, options);
    const { totalDocs } = await user;
    if (!totalDocs || totalDocs === 0) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
        user,
      });
    }
    return res.status(200).json({
      message: "Danh sách người dùng",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        message: "Người dùng không tồn tại",
      });
    }
    return res.status(200).json({
      message: "Lấy người dùng thành công",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = await createUserSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }
    const user = await User.create(req.body);
    return res.status(201).json({
      message: "Account registration successful",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = await userSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }

    const user = await User.findById(req.params["uid"]);
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Password does not match",
      });
    }
    delete req.body.password;
    const userUpdate = await User.findByIdAndUpdate(
      { _id: req.params["uid"] },
      req.body,
      { new: true }
    );
    return res.status(200).json({
      message: "Account updated successfully",
      userUpdate,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        message: "Failed to delete user",
      });
    }
    return res.status(200).json({
      message: "User successfully deleted",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const search = async (req, res) => {
  try {
    const {
      _page = 1,
      _order = "asc",
      _sort = "createdAt",
      _limit = 10,
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? 1 : -1,
      },
    };
    const user = await User.paginate(
      {
        $or: [
          {
            name: {
              $regex: req.params.key,
              $options: "i",
            },
            status: true,
          },
        ],
      },
      options
    );
    const { totalDocs } = await user;
    if (!totalDocs || totalDocs === 0) {
      return res.status(404).json({
        message: "User not found",
        user,
      });
    }
    return res.status(200).json({
      message: "List of users",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
