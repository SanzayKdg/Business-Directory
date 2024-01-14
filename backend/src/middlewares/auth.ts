import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../@config/constants.config.js";
import { ObjectId } from "mongodb";
import { User } from "../models/Users/user.js";

export const is_authenticated = async (req: any, res: any, next: any) => {
  try {
    const { token } = req.cookies;
    const decoded_data: any = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(new ObjectId(decoded_data.id));

    next();
  } catch (error: any) {
    return next(
      res.status(500).json({
        success: false,
        message: "Please login first.",
        error: error.message,
      })
    );
  }
};
