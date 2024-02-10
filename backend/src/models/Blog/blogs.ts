import mongoose from "mongoose";
import { BlogCategory, BlogStatus } from "../../@types/blogs.t.js";

interface BlogDocument extends Document {
  title: string;
  slug: string;
  description: string;
  category: BlogCategory;
  cover: string;
  image: string[];
  tags: string[];
  user: Object;
  blog_status: BlogStatus;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchmea = new mongoose.Schema<BlogDocument>(
  {
    title: {
      type: String,
      required: [true, "Please enter blog title."],
    },
    slug: {
      type: String,
      required: [true, "Please enter blog slug."],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please add your blog description."],
    },

    category: {
      type: String,
      enum: Object.values(BlogCategory),
      default: BlogCategory.OTHER,
      required: [true, "Please select atleast one category."],
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

const Blog = mongoose.model<BlogDocument>("Blogs", blogSchmea);

export default Blog;
