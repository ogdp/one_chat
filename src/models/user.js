import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, mongooseDelete];
const informationSchema = new mongoose.Schema({
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
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
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
  avatar_url: {
    type: Array,
  },
});

const userSchema = new mongoose.Schema(
  {
    email_tel: {
      type: String,
      minLength: 2,
      maxLength: 32,
      required: true,
    },
    active_status: {
      type: String,
      default: "active",
    },
    role: {
      type: String,
      default: "member",
    },
    information: {
      type: informationSchema,
      default: {},
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 256,
      required: true,
    },
    refreshToken: {
      type: Array,
    },
  },
  { timestamps: true, versionKey: false }
);
plugins.forEach((plugin) => {
  userSchema.plugin(plugin);
});
const User = mongoose.model("User", userSchema);

export default User;
