import express from "express";
import { createChat, getAllChatUser, searchChat } from "../controllers/chat.js";
import { checkTokenOwnership } from "../middlewares/checkPermission.js";

const router = express.Router();

router.post("/", checkTokenOwnership, createChat);
router.get("/", checkTokenOwnership, getAllChatUser);
router.get("/search", checkTokenOwnership, searchChat);

export default router;
