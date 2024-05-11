import { createPostSchema, updatePostSchema } from "../schemas/post.js";
import Post from "../models/post.js";

export const getAllPost = async (req, res) => {
  try {
    const {
      _page = 1,
      _order = "asc",
      _sort = "createdAt",
      _limit = 20,
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? 1 : -1,
      },
      populate: [
        {
          path: "author",
          select:
            "information.firstName information.lastName information.avatar_url _id",
        },
      ],
    };
    const posts = await Post.paginate(
      {
        $and: [{ status: true }],
      },
      options
    );
    const { totalDocs } = await posts;
    if (!totalDocs || totalDocs === 0) {
      return res.status(404).json({
        success: true,
        message: "Không tồn tại bài viết nào !!!",
        posts,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Lấy danh sách bài viết thành công",
      data: posts,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};
export const getAllPostOneUser = async (req, res) => {
  try {
    const {
      _page = 1,
      _order = "asc",
      _limit = 20,
      _sort = "createdAt",
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? -1 : 1,
      },
      populate: [
        {
          path: "author",
          select:
            "information.firstName information.lastName information.avatar_url _id",
        },
      ],
    };

    let posts = "";

    if (req.params.idUser == "0") {
      posts = await Post.paginate(
        {
          $and: [{ author: new Object(req.user._id).toString() }],
        },
        options
      );
    } else {
      posts = await Post.paginate(
        {
          $and: [{ author: String(req.params.idUser) }, { status: true }],
        },
        options
      );
    }

    if (!posts) {
      return res.status(404).json({
        success: true,
        message: "Không tồn tại bài viết !!!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Lấy bài viết thành công",
      data: posts,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};
export const getOnePost = async (req, res) => {
  try {
    const {
      _page = 1,
      _order = "asc",
      _limit = 20,
      _sort = "createdAt",
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? -1 : 1,
      },
      populate: [
        {
          path: "author",
          select:
            "information.firstName information.lastName information.avatar_url _id",
        },
      ],
    };

    const post = await Post.paginate(
      {
        $and: [{ _id: String(req.params.idPost) }],
      },
      options
    );
    if (!post) {
      return res.status(404).json({
        success: true,
        message: "Không tồn tại bài viết !!!",
      });
    }
    if (!post.docs[0].status) {
      String(post.docs[0].author._id) !== String(req.user._id)
        ? res.status(404).json({
            success: true,
            message: "Không tồn tại bài viết !!!",
          })
        : res.status(200).json({
            success: true,
            message: "Lấy bài viết thành công",
            data: post.docs[0],
          });
    } else {
      return res.status(200).json({
        success: true,
        message: "Lấy bài viết thành công",
        data: post.docs[0],
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};
export const createPost = async (req, res) => {
  const uid = new Object(req.user._id).toString();
  try {
    const { error } = await createPostSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: true,
        message: error.details.map((err) => err.message),
      });
    }
    const payload = { ...req.body, ...{ author: uid } };
    const post = await Post.create(payload);
    return res.status(200).send({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
export const updatePost = async (req, res) => {
  const uid = new Object(req.user._id).toString();
  try {
    const { error } = await updatePostSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: true,
        message: error.details.map((err) => err.message),
      });
    }

    const checkPost = await Post.find({
      _id: req.params.idPost,
    });
    if (
      checkPost[0].author &&
      String(checkPost[0].author) !== String(req.user._id)
    ) {
      return res.status(400).send({
        error: true,
        message: "Did not find the article",
      });
    }

    const payload = { ...req.body, ...{ author: uid } };
    const post = await Post.findByIdAndUpdate(
      { _id: req.params.idPost },
      payload,
      {
        new: true,
      }
    );
    return res.status(200).send({
      success: true,
      message: "Update post successfully",
      data: post,
    });
  } catch (error) {
    return res.status(400).send({
      error: true,
      message: error.message,
    });
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.idPost,
      author: req.user._id,
    });
    if (!post) {
      return res.status(400).json({
        error: true,
        message: "Failed to delete post",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post successfully deleted",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};
