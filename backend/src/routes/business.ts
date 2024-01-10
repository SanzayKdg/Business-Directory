import express from "express";
import { is_authenticated } from "../middlewares/auth.js";
import {
  getAllBusiness,
  getSingleBusiness,
  registerBusiness,
  updateBusiness,
} from "../controllers/Business/business.js";
import { roles } from "../middlewares/roles.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

// ---------------------- BUSINESS OWNER ENDPOINT ---------------------------------
router
  .route("/register")
  .post(is_authenticated, roles("business"), upload, registerBusiness);
router
  .route("/update/:id")
  .patch(is_authenticated, roles("business"), upload, updateBusiness);

// ---------------------- PUBLIC ENDPOINT ---------------------------------
router.route("/all").get(getAllBusiness);
router.route("/:id").get(getSingleBusiness);

export default router;
