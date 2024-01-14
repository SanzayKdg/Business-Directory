import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, "Please give rating from 1 to 5."],
    default: 0,
  },

  comment: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please login first to add review."],
  },
  blogs: {
    type: mongoose.Schema.ObjectId,
    ref: "Blogs",
    required: true,
  },
});

const BlogReviews = mongoose.model("BlogReviews", reviewSchema);

export default BlogReviews;
