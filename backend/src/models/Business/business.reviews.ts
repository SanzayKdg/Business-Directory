import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, "Please give rating from 1 to 5."],
    default: 0,
  },

  comment: {
    type: String,
    required: [true, "Please leave a review."],
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please login first to add review."],
  },
  business: {
    type: mongoose.Schema.ObjectId,
    ref: "Business",
    required: true,
  },
});

const Reviews = mongoose.model("Reviews", reviewSchema);

export default Reviews;
