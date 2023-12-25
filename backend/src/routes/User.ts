import express from "express";
import { emailVerify, login, register } from "../controllers/user.js";
import { is_authenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/verify").post(emailVerify);
router.route("/login").post(login);
router
  .route("/hello")
  .get(is_authenticated, (req: any, res: any) => res.json("Hello"));
export default router;
