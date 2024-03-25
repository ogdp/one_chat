import express from "express";
import { signup, signin } from "../controllers/auth.js";
import { generateToken } from "../controllers/jwt-service.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/generateToken", generateToken);

export default router;
