import mongoose from "mongoose";
import { BlogStatus } from "../@types/blogs.t.js";

const blogSchmea = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter blog title."],
    },
    slug: {
      type: String,
      //   required: [true, "Please enter blog slug."],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please add your blog description."],
    },
    cover: {
      type: String,
    },

    image: [
      {
        type: String,
      },
    ],

    tags: [
      {
        type: String,
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    blog_status: {
      type: String,
      enum: Object.values(BlogStatus),
      default: BlogStatus.DRAFT,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blogs", blogSchmea);

export default Blog;
