// ---------------------- GET ALL BUSINESS LISTS ---------------------------------

import { User } from "../../models/user.js";
import ApiFeatures from "../../@helpers/ApiFeatures.js";
import { Business } from "../../models/business.js";
import Blog from "../../models/blogs.js";

export const getAllBusiness = async (req: any, res: any, next: any) => {
  try {
    const resultPerPage = 8;
    const businessCount = await Business.countDocuments();
    const apiFeatures = new ApiFeatures(Business.find(), req.query)
      .filter()
      .search()
      .pagination(resultPerPage);

    const business = await apiFeatures.query;

    const result = business.map((item: any) => {
      return {
        id: item._id,
        name: item.name,
        address: item.address,
        account_status: item.account_status,
        is_online: item.is_online,
        is_verified: item.is_verified,
        amenity: item.amenity,
      };
    });

    res
      .status(200)
      .json({ success: true, result, businessCount, resultPerPage });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- GET SINGLE BUSINESS ---------------------------------

export const getSingleBusiness = async (req: any, res: any, next: any) => {
  try {
    // check business with id exists
    const { id } = req.params;
    const business = await Business.findById(id);
    if (!business) {
      return next(
        res.status(400).json({
          success: false,
          message: "Business does not exists or is deleted",
        })
      );
    }
    res.status(200).json({ success: true, business });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- GET ALL USERS ---------------------------------

export const getAllUsers = async (req: any, res: any, next: any) => {
  try {
    const resultPerPage = 8;
    const userCount = await User.countDocuments();
    const apiFeatures = new ApiFeatures(User.find(), req.query)
      .filter()
      .search()
      .pagination(resultPerPage);

    const users = await apiFeatures.query;

    const result = users.map((item: any) => {
      return {
        id: item._id,
        full_name: item.full_name,
        email: item.email,
        avatar: item.avatar,
        is_verified: item.is_verified,
        user_role: item.user_role,
      };
    });

    res.status(200).json({ success: true, result, userCount, resultPerPage });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- GET SINGLE USER ---------------------------------

export const getSingleUser = async (req: any, res: any, next: any) => {
  try {
    // check user with id exists
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(
        res.status(400).json({
          success: false,
          message: "Business does not exists or is deleted",
        })
      );
    }
    res.status(200).json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- GET ALL BLOGS (ADMIN -- AUTH) ---------------------------------
export const allBlogsAdmin = async (req: any, res: any, next: any) => {
  try {
    const blogs = await Blog.find();

    if (!blogs) {
      return next(
        res.status(400).json({ success: false, message: "No Blogs Found." })
      );
    }

    res.status(200).json({ success: true, blogs });
  } catch (error: any) {
    res.staus(500).json({ success: false, message: error.message });
  }
};
