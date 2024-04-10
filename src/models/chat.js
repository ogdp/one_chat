import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, mongooseDelete];

const chatSchema = new mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);
plugins.forEach((plugin) => {
  chatSchema.plugin(plugin);
});
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
