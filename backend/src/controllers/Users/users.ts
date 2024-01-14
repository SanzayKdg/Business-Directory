import { User } from "../../models/Users/user.js";
import sendToken from "../../@helpers/sendToken.js";
import {
  RequestResetPasswordDTO,
  ResetPasswordDTO,
  UpdatePasswordDTO,
  UpdateProfileDTO,
} from "./dto/users.dto.js";
import { validate } from "class-validator";
import * as fs from "fs";
import { sendmail } from "../../@helpers/sendmail.js";
import { defualtMailTemplate } from "../../@helpers/mailTemplate.js";
import { OTP_EXPIRY } from "../../@config/constants.config.js";
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

    if (email && payload.email) {
      user.otp = Math.floor(Math.random() * 100000);
      user.otp_expiry = new Date(Date.now() + OTP_EXPIRY * 60 * 1000);
      user.is_verified = false;

      sendmail({
        to: user.email,
        subject: "Email verification",
        html: defualtMailTemplate({
          title: "Email Verification",
          name: user.full_name,
          message: `Your OTP is ${user.otp}`,
        }),
      });

      await user.save();
    }

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

// ------------------------------ UPDATE PASSWORD ----------------------------------------------
export const updatePassword = async (req: any, res: any, next: any) => {
  try {
    const { old_password, new_password, confirm_password } = req.body;
    // check if user exists
    const user: any = await User.findById({ _id: req.user._id }).select(
      "+password"
    );

    // Validation

    const payload = new UpdatePasswordDTO();
    payload.old_password = old_password;
    payload.confirm_password = confirm_password;
    payload.new_password = confirm_password;

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

    // match password
    const passwordMatch = await user.comparePassword(old_password);
    if (!passwordMatch) {
      console.log(passwordMatch);
      return next(
        res
          .status(400)
          .json({ success: false, message: "Password didn't Matched" })
      );
    }

    if (new_password !== confirm_password) {
      return next(
        res
          .status(400)
          .json({ success: false, message: "Password didn't Matched" })
      );
    }

    // update password
    user.password = new_password;
    user.updatedAt = Date.now();
    await user.save();

    // delete cookie
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------ FORGOT PASSWORD ----------------------------------------------

export const forgotPassword = async (req: any, res: any, next: any) => {
  try {
    const { email } = req.body;

    const payload = new RequestResetPasswordDTO();
    payload.email = email;

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

    const user = await User.findOne({ email });
    if (!user) {
      return next(
        res.status(400).json({
          success: false,
          message: "Invalide email or User does not exists.",
        })
      );
    }

    user.otp = Math.floor(Math.random() * 100000);
    user.otp_expiry = new Date(Date.now() + OTP_EXPIRY * 60 * 1000);

    await user.save();

    sendmail({
      to: user.email,
      subject: "Reset Password",
      html: defualtMailTemplate({
        title: "Reset Password",
        name: user.full_name,
        message: `Your OTP is ${user.otp}`,
      }),
    });

    res
      .status(200)
      .json({ success: true, message: "OTP has been sent to your email." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------ RESET PASSWORD ----------------------------------------------

export const resetPassword = async (req: any, res: any, next: any) => {
  try {
    const { otp, new_password, confirm_password } = req.body;

    const payload = new ResetPasswordDTO();
    payload.otp = otp;
    payload.new_password = new_password;
    payload.confirm_password = confirm_password;

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

    const user: any = await User.findOne({
      otp,
      otp_expiry: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        res
          .status(400)
          .json({ success: false, message: "OTP is inavlid or expired" })
      );
    }

    if (new_password !== confirm_password) {
      return next(
        res
          .status(400)
          .json({ success: false, message: "Password did not matched" })
      );
    }

    user.password = new_password;
    user.otp = null;
    user.otp_expiry = null;
    user.updatedAt = Date.now();
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password changed successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------ DELETE PROFILE ----------------------------------------------
export const deleteProfile = async (req: any, res: any, next: any) => {
  try {
    // check if user exists or is logged in
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      return next(
        res.status(400).json({
          success: false,
          message: "Account does not exists.",
        })
      );
    }

    // Delete Avatar
    if (user.avatar && user.avatar.length > 0) {
      fs.unlinkSync(user.avatar);
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
