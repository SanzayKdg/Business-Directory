import express from "express";
import { is_authenticated } from "../middlewares/auth.js";
import {
  deleteBusiness,
  getAllBusiness,
  getSingleBusiness,
  registerBusiness,
  updateBusiness,
} from "../controllers/Business/business.js";
import {
  newReview,
  getAllReviews,
  deleteReview,
} from "../controllers/Business/business.reviews.js";
import { roles } from "../middlewares/roles.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

// ---------------------- BUSINESS OWNER ENDPOINT ---------------------------------
router
  .route("/register")
  .post(is_authenticated, roles("business"), upload, registerBusiness);
router
  .route("/:id")
  .patch(is_authenticated, roles("business"), upload, updateBusiness)
  .delete(is_authenticated, roles("business"), deleteBusiness);

// ---------------------- PUBLIC ENDPOINT ---------------------------------

router.route("/all").get(getAllBusiness);
router.route("/:slug").get(getSingleBusiness);


// ---------------------- REVIEWS ENDPOINT ---------------------------------
// ---------------------- PUBLIC ENDPOINT (AUTH) ---------------------------------

router.route("/reviews/new/:id").post(is_authenticated, newReview);
router.route("/reviews/:id").delete(is_authenticated, deleteReview);

// ---------------------- PUBLIC ENDPOINT (NO AUTH) ---------------------------------
router.route("/reviews/all/:id").get(getAllReviews);

export default router;
