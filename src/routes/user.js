import express from "express";
import { checkTokenOwnership } from "../middlewares/checkPermission.js";
import {
  create,
  getMe,
  getGuest,
  getAll,
  remove,
  update,
  search,
  updatePass,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAll);
router.get("/me", checkTokenOwnership, getMe);
router.get("/:uid", getGuest);
router.post("", create);
router.patch("/", checkTokenOwnership, update);
router.delete("/", checkTokenOwnership, remove);
router.get("/search/top", search); // Example: http://localhost:8080/api/users/search/top?key=Đức&&_order=desc&_sort=createdAt&_limit=1&_page=1
router.patch("/update-password", checkTokenOwnership, updatePass);

export default router;
