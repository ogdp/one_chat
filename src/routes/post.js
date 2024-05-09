import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getAllPostOneUser,
  getOnePost,
  updatePost,
} from "../controllers/post.js";
import { checkTokenOwnership } from "../middlewares/checkPermission.js";

const router = express.Router();

router.get("/all-posts", checkTokenOwnership, getAllPost);
router.get("/one-post/:idPost", checkTokenOwnership, getOnePost);
router.get("/all-post-user/:idUser", checkTokenOwnership, getAllPostOneUser);
router.post("/", checkTokenOwnership, createPost);
router.patch("/:idPost", checkTokenOwnership, updatePost);
router.delete("/:idPost", checkTokenOwnership, deletePost);

export default router;
