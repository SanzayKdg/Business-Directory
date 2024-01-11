import express from "express";
import {
  newReview,
  getAllReviews,
  deleteReview,
} from "../controllers/Reviews/Reviews.js";
import { is_authenticated } from "../middlewares/auth.js";

const router = express.Router();

// ---------------------- PUBLIC ENDPOINT (AUTH) ---------------------------------

router.route("/new/:id").post(is_authenticated, newReview);
router.route("/:id").delete(is_authenticated, deleteReview);

// ---------------------- PUBLIC ENDPOINT (NO AUTH) ---------------------------------

router.route("/all/:id").get(getAllReviews);

export default router;
