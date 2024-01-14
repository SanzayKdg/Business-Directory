import { validate } from "class-validator";
import { NewBlogReviewsDTO } from "./dto/BlogDto.js";
import Blog from "../../models/Blog/blogs.js";
import BlogReviews from "../../models/Blog/blog.review.js";
import { ObjectId } from "mongodb";
import { BlogStatus } from "../../@types/blogs.t.js";

// ---------------------- CREATE NEW REVIEW ( LIKE/COMMENT ) A BLOG (PUBLC -- AUTH) ---------------------------------
export const newReviewBlog = async (req: any, res: any, next: any) => {
  try {
    const { rating, comment } = req.body;

    const payload = new NewBlogReviewsDTO();
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

    // check if the blog exists or not
    const blog = await Blog.findOne({
      _id: req.params.id,
      blog_status: BlogStatus.PUBLISHED,
    });
    if (!blog) {
      return next(
        res.status(400).json({
          success: false,
          message: "Blog doesnot exists or have been deleted.",
        })
      );
    }

    // check if user has previously liked or not
    const reviews: any = await BlogReviews.findOne({
      user: req.user._id,
      blogs: req.params.id,
    });

    // update the existing review
    if (reviews) {
      reviews.rating = rating;
      reviews.comment = comment;
      await reviews.save();
    } else {
      await BlogReviews.create({
        rating: payload.rating,
        comment: payload.comment,
        user: new ObjectId(req.user._id),
        blogs: new ObjectId(req.params.id),
      });
    }

    res
      .status(201)
      .json({ success: true, message: "Successfully reviewed a blog." });
  } catch (error: any) {}
};

// ---------------------- GET ALL  LIKES & COMMENT OF BLOG (PUBLC -- NO-AUTH) ---------------------------------
export const allReviews = async (req: any, res: any, next: any) => {
  try {
    // check if any reviews for a blog exists
    const reviews = await BlogReviews.find({ blog: req.params.id });
    // check if the reviews for business exists
    if (!reviews || reviews.length <= 0) {
      return next(
        res.status(400).json({
          success: false,
          message: "No reviews yet.",
        })
      );
    }

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- DELETE A REVIEW (PUBLC -- AUTH) ---------------------------------
export const deleteBlogReview = async (req: any, res: any, next: any) => {
  try {
    const reviews = await BlogReviews.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!reviews) {
      return next(
        res.status(400).json({ success: false, message: "No reviews found." })
      );
    }

    await BlogReviews.findByIdAndDelete({
      _id: req.params.id,
    });

    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
