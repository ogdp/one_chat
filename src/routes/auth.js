import express from "express";
import { signup, signin, logout } from "../controllers/auth.js";
import { generateToken } from "../controllers/jwt-service.js";
import { checkTokenOwnership } from "../middlewares/checkPermission.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/generateToken", generateToken);
router.post("/logout", checkTokenOwnership, logout);

export default router;
