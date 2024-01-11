import { Business } from "../../models/business.js";
import Reviews from "../../models/reviews.js";
import { NewReviewDTO } from "./dto/ReviewsDto.js";
import { ObjectId } from "mongodb";
import { validate } from "class-validator";

// ---------------------- ADD NEW REVIEW (PUBLC -- AUTH) ---------------------------------

export const newReview = async (req: any, res: any, next: any) => {
  try {
    const { comment, rating } = req.body;

    const payload = new NewReviewDTO();
    payload.rating = rating;
    payload.comment = comment;

    // Validation
    const errors = await validate(payload);

    if (errors.length > 0) {
      const validation_error = errors.reduce((acc: any, error) => {
        // Destructuring error object and getting property and constraints
        // For e.g. property : password, constraint: minLength['password must be longer or than equal to 8 characters ]
        const { property, constraints } = error;
        acc[property] = Object.values(constraints || {});
        return acc;
      }, {});
      return next(
        res.status(400).json({ success: false, message: validation_error })
      );
    }
    // find business if exists
    const business = await Business.findOne({ _id: req.params.id });
    if (!business) {
      return next(
        res
          .status(400)
          .json({ success: false, message: "Business listing not found." })
      );
    }
    // check if user is adding new review
    const reviews: any = await Reviews.findOne({
      user: req.user._id,
      business: req.params.id,
    });
    if (reviews) {
      // update the existing review
      reviews.comment = comment;
      reviews.rating = rating;
      reviews.user = new ObjectId(req.user._id);
      reviews.business = new ObjectId(req.params.id);

      await reviews.save();
    } else {
      // if no user found. then create new review.
      await Reviews.create({
        rating,
        comment,
        user: new ObjectId(req.user._id),
        business: new ObjectId(req.params.id),
      });
    }

    res
      .status(201)
      .json({ success: true, message: "Successfully reviewed a business" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- GET ALL REVIEW (PUBLC -- NO AUTH) ---------------------------------
export const getAllReviews = async (req: any, res: any, next: any) => {
  try {
    const reviews = await Reviews.find({ business: req.params.id });
    // check if the reviews for business exists
    if (!reviews || reviews.length <= 0) {
      return next(
        res.status(400).json({
          success: false,
          message: "No reviews yet.",
        })
      );
    }

    res.status(200).json({ success: true, reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- GET ALL REVIEW (PUBLC -- AUTH) ---------------------------------
export const deleteReview = async (req: any, res: any, next: any) => {
  try {
    const reviews = await Reviews.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!reviews) {
      return next(
        res.status(400).json({ success: false, message: "No reviews found." })
      );
    }

    await Reviews.findByIdAndDelete({
      _id: req.params.id,
    });

    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
