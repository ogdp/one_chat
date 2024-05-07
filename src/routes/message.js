import express from "express";
import { checkTokenOwnership } from "../middlewares/checkPermission.js";
import { createMessage, getMessage } from "../controllers/message.js";

const router = express.Router();

router.post("/", checkTokenOwnership, createMessage);
router.get("/:chatId", checkTokenOwnership, getMessage);

export default router;
