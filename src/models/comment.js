import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, mongooseDelete];

const commentSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
    contents: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true, versionKey: false }
);
plugins.forEach((plugin) => {
  commentSchema.plugin(plugin);
});
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
