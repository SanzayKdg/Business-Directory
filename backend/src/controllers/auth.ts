import { TypeOrmConfig } from "../@config/typeorm.config.js";
import { User } from "../entity/user.entity.js";
import bcrypt from "bcryptjs";
import { OTP_EXPIRY } from "../@config/constants.config.js";
import { sendmail } from "../@helpers/sendmail.js";
import { defualtMailTemplate } from "../@helpers/mailTemplate.js";
import {
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
  VerifyEmailDto,
} from "../dtos/user.dto.js";
import { validate } from "class-validator";
import sendToken from "../@helpers/sendToken.js";
import { NextFunction, Request, Response } from "express";

// ---------------------- REGISTER ---------------------------------
// /** *
//  * @swagger
//  * /hello:
//  *     get:
//  *      summary :Hello APi
//  *      description : Hello ApI
//  *      responses :
//  *          200:
//  *              description: Test
//  */

export const register = async (req: any, res: any, next: any) => {
  try {
    const { email, password, user_role, confirm_password, full_name } =
      req.body;

    const payload = new CreateUserDto();
    payload.email = email;
    payload.full_name = full_name;
    payload.user_role = user_role;
    payload.password = password;
    payload.confirm_password = confirm_password;

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

    // check if user with same email exists
    const email_exists = await TypeOrmConfig.getRepository(User).findOne({
      where: { email },
    });

    if (email_exists) {
      return next(
        res.status(400).json({
          success: false,
          message: "User with this email already exists",
        })
      );
    }

    if (password !== confirm_password) {
      return next(
        res
          .status(400)
          .json({ success: false, message: "Password didn't matched." })
      );
    }
    //   generate otp number
    const otp = Math.floor(Math.random() * 100000);

    //   register new user
    const user = await TypeOrmConfig.getRepository(User).save({
      email,
      full_name,
      password: await bcrypt.hash(password, 12),
      user_role,
      otp,
      otp_expiry: new Date(Date.now() + OTP_EXPIRY * 60 * 1000),
    });

    //  send OTP in email
    sendmail({
      to: user.email,
      subject: "Email verification",
      html: defualtMailTemplate({
        title: "Email Verification",
        name: user.full_name,
        message: `Your OTP is ${user.otp}`,
      }),
    });

    return res.status(201).json({
      success: true,
      message: `User registered. Please check your mail for verification.`,
      user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- EMAIL VERIFICATION ---------------------------------
export const emailVerify = async (req: any, res: any, next: any) => {
  try {
    const { email, otp } = req.body;
    const payload = new VerifyEmailDto();

    payload.email = email;
    payload.otp = otp;

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

    // check if user with email exists
    const user = await TypeOrmConfig.getRepository(User).findOne({
      where: { email },
    });

    if (!user) {
      return next(
        res.status(404).json({
          success: false,
          message: "Email is invalid or doesn't exists",
        })
      );
    }

    // check if otp is correct
    if (payload.otp !== user?.otp) {
      return next(
        res
          .status(400)
          .json({ success: false, message: "OTP is inavlid or expired" })
      );
    }

    user.otp = null;
    user.otp_expiry = null;
    user.is_verified = true;
    // save user and set verified true
    await TypeOrmConfig.getRepository(User).save(user);

    res
      .status(200)
      .json({ success: true, message: "User verified successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- LOGIN ---------------------------------
export const login = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;
    const payload = new LoginDto();
    payload.email = email;
    payload.password = password;

    // validation
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

    // check email if user exists
    const user = await TypeOrmConfig.getRepository(User).findOne({
      where: { email },
      select: { password },
    });
    if (!user) {
      return next(
        res.status(400).json({ success: false, message: "Invalid Credentials" })
      );
    }

    // match password
    const passwordMatch = await user?.comparePassword(password);
    if (!passwordMatch) {
      return next(
        res.status(400).json({ success: false, message: "Invalid Credentials" })
      );
    }

    // if both matches send token to user
    sendToken(user, 200, res, "Login Success");
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ------------------------------ LOGOUT ----------------------------------------------

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
