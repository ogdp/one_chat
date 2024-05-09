import express from "express";
import {
  like_comment_share,
  get_one_list,
} from "../controllers/actionsPost.js";
import { checkTokenOwnership } from "../middlewares/checkPermission.js";

const router = express.Router();

router.get("/get-one-list/:idPost", checkTokenOwnership, get_one_list);
router.post("/:idPost", checkTokenOwnership, like_comment_share);

export default router;
