import express from "express";
import {
  emailVerify,
  login,
  logout,
   register,
} from "../controllers/Auth/auth.js";
import { is_authenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/verify").post(emailVerify);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
