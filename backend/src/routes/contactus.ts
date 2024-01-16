import express from "express";
import { newMessage, getAllMessage } from "../controllers/ContactUs/Contact.js";
import { is_authenticated } from "../middlewares/auth.js";
import { roles } from "../middlewares/roles.js";

const router = express.Router();

router.route("/new").post(newMessage);

router.route("/admin/all").get(is_authenticated, roles("admin"), getAllMessage);

export default router;
