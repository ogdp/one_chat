import express from "express";
import checkPermission, {
  checkPermissionMember,
  checkTokenOwnership,
} from "../middlewares/checkPermission.js";
import { create, get, getAll, remove, update } from "../controllers/user.js";

const router = express.Router();

router.get("/", checkPermissionMember, getAll);
router.get("/:uid", get);
router.post("", create);
router.patch("/:uid", checkTokenOwnership, update);
router.delete("/:uid", checkPermission, remove);

export default router;
