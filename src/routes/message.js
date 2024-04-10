import express from "express";
import { checkTokenOwnership } from "../middlewares/checkPermission.js";
import { createMessage, getMessage } from "../controllers/message.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessage);

export default router;
