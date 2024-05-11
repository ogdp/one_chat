import Post from "../models/post.js";
import Comment from "../models/comment.js";
import { createCommentSchema } from "../schemas/comment.js";

export const get_one_list = async (req, res) => {
  const uid = new Object(req.user._id).toString();
  try {
    return res.status(200).send({
      success: true,
      message: "Post created successfully",
    });
  } catch (error) {
    return res.status(400).send({
      error: true,
      message: error.message,
    });
  }
};

export const like_comment_share = async (req, res) => {
  try {
    const { actions } = req.query;
    if (!actions)
      return res.status(403).send({
        error: true,
        message: "Please select one actions",
      });
    const checkPost = await Post.find({
      _id: req.params.idPost,
    });
    if (!checkPost[0]?.status)
      return res.status(403).send({
        error: true,
        message: "Activate display status for the post",
      });

    switch (actions) {
      case "like":
        (async () => {
          try {
            // Switch like with $cond mongodb
            const like = await Post.updateOne(
              { _id: req.params.idPost, status: true },
              [
                {
                  $set: {
                    likes: {
                      // https://www.mongodb.com/docs/v3.4/reference/operator/aggregation-conditional/
                      $cond: {
                        if: { $in: [req.user._id, "$likes"] },
                        then: {
                          $filter: {
                            input: "$likes",
                            as: "like",
                            cond: { $ne: ["$$like", req.user._id] },
                          },
                        },
                        else: { $concatArrays: ["$likes", [req.user._id]] },
                      },
                    },
                  },
                },
              ],
              { new: true }
            );

            if (like.modifiedCount == 0) {
              return res.status(400).send({
                error: true,
                message: "Can't like post now",
              });
            }
            return res.status(200).send({
              success: true,
              message: "Liked post successfully",
              like,
            });
          } catch (error) {
            return res.status(400).send({
              error: true,
              message: error.message,
            });
          }
        })();
        break;
      case "comment":
        (async () => {
          try {
            const { error } = await createCommentSchema.validate(req.body, {
              abortEarly: false,
            });
            if (error) {
              return res.status(400).json({
                error: error.details.map((err) => err.message),
              });
            }
            const comment = await Comment.create(req.body);
            await Post.findOneAndUpdate(
              { _id: req.body.post },
              { $addToSet: { comments: comment._id } }
            );
            return res.status(200).send({
              success: true,
              message: "Comment post successfully",
              comment,
            });
          } catch (error) {
            return res.status(400).send({
              error: true,
              message: error.message,
            });
          }
        })();
        break;
      case "share":
        (async () => {
          try {
            const share = await Post.updateMany(
              {
                _id: req.params.idPost,
                status: true,
              },
              // Thêm uid nếu đã tồn tại nó vẫn thêm tiếp
              { $push: { shares: req.user._id } },
              {
                new: true,
              }
            );
            if (share.modifiedCount == 0) {
              return res.status(400).send({
                error: true,
                message: "Can't share post now",
              });
            }
            return res.status(200).send({
              success: true,
              message: "Share post successfully",
              share,
            });
          } catch (error) {
            return res.status(400).send({
              error: true,
              message: error.message,
            });
          }
        })();
        break;
      default:
        return res.status(403).send({
          error: true,
          message: "Please select one actions",
        });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
