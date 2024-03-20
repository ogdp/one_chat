import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, mongooseDelete];
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 2,
      maxLength: 32,
      required: true,
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 32,
      required: true,
    },
    email_tel: {
      type: String,
      minLength: 2,
      maxLength: 32,
      required: true,
      // unique: true, // cho phép tạo duy nhất trường chứa email_tel
    },
    dateOfBirth: {
      type: Date,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
    },
    avatar_url: {
      type: Array,
    },
    location: {
      type: String,
      minLength: 3,
      maxLength: 32,
    },
    province: {
      type: String,
      minLength: 3,
      maxLength: 32,
    },
    refreshToken: {
      type: Array,
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 256,
      required: true,
    },
    role: {
      type: String,
      default: "member",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
plugins.forEach((plugin) => {
  userSchema.plugin(plugin);
});
export default mongoose.model("User", userSchema);
