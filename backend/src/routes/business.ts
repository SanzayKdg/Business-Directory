import express from "express";
import { is_authenticated } from "../middlewares/auth.js";
import { registerBusiness } from "../controllers/Business/business.js";
import { roles } from "../middlewares/roles.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router
  .route("/register")
  .post(is_authenticated, roles("business"), upload, registerBusiness);
export default router;
