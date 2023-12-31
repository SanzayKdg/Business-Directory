import { User } from "../../models/user.js";
import sendToken from "../../@helpers/sendToken.js";
import { UpdateProfileDTO } from "./dto/users.dto.js";
import { validate } from "class-validator";
import * as fs from "fs";
// ------------------------------ GET MY PROFILE ----------------------------------------------
export const profile = async (req: any, res: any, next: any) => {
  try {
    const user = await User.findById(req.user._id);
    // send token as response
    sendToken(user, 200, res, `Welcome ${user?.full_name}`);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------ UPDATE PROFILE ----------------------------------------------
export const updateProfile = async (req: any, res: any, next: any) => {
  try {
    // check if user exists
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      return next(
        res
          .status(400)
          .json({ success: false, message: "Account does not exists" })
      );
    }

    // update user
    const { email, full_name, phone_number, birth_date, gender, address } =
      req.body;

    let avatar: string = "";

    // Validation
    const payload = new UpdateProfileDTO();
    payload.email = email;
    payload.full_name = full_name;
    payload.phone_number = phone_number;
    payload.birth_date = birth_date;
    payload.gender = gender;
    payload.address = address;

    if (payload.avatar) {
      payload.avatar = null;
    }
    if (req.file) {
      avatar = req.file.path;
      payload.avatar = avatar;

      // Delete old avatar (assuming user.avatar is an array)
      if (user.avatar && user.avatar.length > 0) {
        const path = user.avatar;
        fs.unlinkSync(path);
      }
    }

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
    const updated_user = {
      email,
      full_name,
      phone_number,
      birth_date,
      gender,
      address,
      avatar,
      updatedAt: Date.now(),
    };

    await User.findByIdAndUpdate(req.user._id, updated_user, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res
      .status(200)
      .json({ success: true, message: "Account Updated Successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------ DELETE PROFILE ----------------------------------------------
export const deleteProfile = async (req: any, res: any, next: any) => {
  try {
    // check if user exists or is logged in
    const user = req.user;
    if (!user) {
      return next(
        res.status(400).json({
          success: false,
          message: "Account does not exists.",
        })
      );
    }

    // delete account
    await User.findByIdAndDelete({ _id: user._id });

    // delete cookie
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
