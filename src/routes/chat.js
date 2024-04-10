import express from "express";
import { createChat } from "../controllers/chat.js";
import { checkTokenOwnership } from "../middlewares/checkPermission.js";

const router = express.Router();

router.post("/", checkTokenOwnership, createChat);

export default router;
