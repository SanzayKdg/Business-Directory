import express from "express";
import { is_authenticated } from "../middlewares/auth.js";
import { profile } from "../controllers/users.js";
const router = express.Router();

router.route("/my-profile").get(is_authenticated, profile);

export default router;
