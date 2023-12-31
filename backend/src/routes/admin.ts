import express from "express";
import {
  getAllBusiness,
  getAllUsers,
  getSingleBusiness,
  getSingleUser,
} from "../controllers/Admin/admin.js";
import { is_authenticated } from "../middlewares/auth.js";
import { roles } from "../middlewares/roles.js";

const router = express.Router();

// ---------------------- ADMIN GET ROUTES ---------------------------------
router
  .route("/business/all")
  .get(is_authenticated, roles("admin"), getAllBusiness);

router
  .route("/business/:id")
  .get(is_authenticated, roles("admin"), getSingleBusiness);

router.route("/users/all").get(is_authenticated, roles("admin"), getAllUsers);
router.route("/user/:id").get(is_authenticated, roles("admin"), getSingleUser);
export default router;
