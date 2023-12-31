import express from "express";
import { is_authenticated } from "../middlewares/auth.js";
import {
  deleteProfile,
  profile,
  updateProfile,
} from "../controllers/Users/users.js";
import { avatarUpload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/my-profile").get(is_authenticated, profile);
router.route("/update").patch(is_authenticated, avatarUpload, updateProfile);
router.route("/delete").delete(is_authenticated, deleteProfile);
export default router;
