import express from "express";
import { is_authenticated } from "../middlewares/auth.js";
import { registerBusiness } from "../controllers/Business/business.js";
import { roles } from "../middlewares/roles.js";
import { uploads } from "../middlewares/multer.js";
const router = express.Router();

router
  .route("/register")
  .post(
    is_authenticated,
    roles("business"),
    uploads.array("images"),
    registerBusiness
  );
export default router;
