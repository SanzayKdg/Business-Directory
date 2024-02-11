import express from "express";
import {
  newBlog,
  getAllBlogs,
  getSinlgeBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/Blogs/Blogs.js";
import { is_authenticated } from "../middlewares/auth.js";
import { blogUpload } from "../middlewares/multer.js";
import {
  allReviews,
  deleteBlogReview,
  newReviewBlog,
} from "../controllers/Blogs/Blog.Reviews.js";

const router = express.Router();

// ---------------------- BLOGS ENDPOINT STARTS HERE ---------------------------------
// ---------------------- PUBLIC ENDPOINT (AUTH) ---------------------------------
router.route("/new").post(is_authenticated, blogUpload, newBlog);
router.route("/delete/:id").delete(is_authenticated, deleteBlog);
router.route("/update/:id").patch(is_authenticated, blogUpload, updateBlog);

// ---------------------- PUBLIC ENDPOINT (NO AUTH) ---------------------------------
router.route("/all").get(getAllBlogs);
router.route("/:slug").get(getSinlgeBlog);
// ---------------------- BLOGS ENDS HERE ---------------------------------

// ---------------------- REVIEWS ENDPOINT START HERE ---------------------------------
// ---------------------- PUBLIC ENDPOINT (AUTH) ---------------------------------
router.route("/reviews/new/:id").post(is_authenticated, newReviewBlog);

// ---------------------- PUBLIC ENDPOINT (NO AUTH) ---------------------------------
router.route("/reviews/all/:id").get(allReviews);
router.route("/reviews/delete/:id").delete(is_authenticated, deleteBlogReview);
// ---------------------- REVIEWS ENDPOINT ENDS HERE ---------------------------------

export default router;
