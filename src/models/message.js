import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, mongooseDelete];

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    deletedUser: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, versionKey: false }
);
plugins.forEach((plugin) => {
  messageSchema.plugin(plugin);
});
const Message = mongoose.model("Message", messageSchema);
export default Message;
