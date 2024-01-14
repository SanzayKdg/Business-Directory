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

const router = express.Router();

// ---------------------- PUBLIC ENDPOINT (AUTH) ---------------------------------
router.route("/new").post(is_authenticated, blogUpload, newBlog);
router.route("/delete/:id").delete(is_authenticated, deleteBlog);
router.route("/update/:id").patch(is_authenticated, blogUpload, updateBlog);

// ---------------------- PUBLIC ENDPOINT (NO AUTH) ---------------------------------
router.route("/all").get(getAllBlogs);
router.route("/:id").get(getSinlgeBlog);

export default router;
