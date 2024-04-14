import express from "express";
import { createChat, getAllChatUser } from "../controllers/chat.js";
import { checkTokenOwnership } from "../middlewares/checkPermission.js";

const router = express.Router();

router.post("/", checkTokenOwnership, createChat);
router.get("/", checkTokenOwnership, getAllChatUser);

export default router;
