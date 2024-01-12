import express from "express";
import {
  newBlog,
  getAllBlogs,
  getSinlgeBlog,
  deleteBlog,
} from "../controllers/Blogs/Blogs.js";
import { is_authenticated } from "../middlewares/auth.js";
import { blogUpload } from "../middlewares/multer.js";
import { roles } from "../middlewares/roles.js";

const router = express.Router();

// ---------------------- PUBLIC ENDPOINT (AUTH) ---------------------------------
router.route("/new").post(is_authenticated, blogUpload, newBlog);
router.route("/delete/:id").delete(is_authenticated, deleteBlog);

// ---------------------- PUBLIC ENDPOINT (NO AUTH) ---------------------------------
router.route("/all").get(getAllBlogs);
router.route("/:id").get(getSinlgeBlog);

export default router;
