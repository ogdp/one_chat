import express from "express";
import { checkTokenOwnership } from "../middlewares/checkPermission.js";
import {
  create,
  getMe,
  getGuest,
  getAll,
  remove,
  update,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAll);
router.get("/me", checkTokenOwnership, getMe);
router.get("/:uid", getGuest);
router.post("", create);
router.patch("/", checkTokenOwnership, update);
router.delete("/", checkTokenOwnership, remove);

export default router;
