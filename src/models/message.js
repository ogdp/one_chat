import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, mongooseDelete];

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
plugins.forEach((plugin) => {
  messageSchema.plugin(plugin);
});
export default mongoose.model("Message", messageSchema);
