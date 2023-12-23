import express from "express";
import { emailVerify, register } from "../controllers/user.js";
const router = express.Router();



router.route("/register").post(register);
router.route("/verify").post(emailVerify);

export default router;
