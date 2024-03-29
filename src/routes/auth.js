import express from "express";
import { signup, signin, logout } from "../controllers/auth.js";
import { generateToken } from "../controllers/jwt-service.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/generateToken", generateToken);
router.post("/logout", logout);

export default router;
