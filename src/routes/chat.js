import express from "express";
import {
  createChat,
  getAllChatUser,
  removeChat,
  searchChat,
} from "../controllers/chat.js";
import { checkTokenOwnership } from "../middlewares/checkPermission.js";

const router = express.Router();

router.post("/", checkTokenOwnership, createChat);
router.get("/", checkTokenOwnership, getAllChatUser);
router.get("/search", checkTokenOwnership, searchChat);
router.delete("/remove-chat/:idChat", checkTokenOwnership, removeChat);

export default router;
