import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, mongooseDelete];

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contents: {
      type: String,
      maxLength: 3000,
      default: "",
    },
    images: {
      type: Array,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    shares: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);
plugins.forEach((plugin) => {
  postSchema.plugin(plugin);
});
const Post = mongoose.model("Post", postSchema);
export default Post;
