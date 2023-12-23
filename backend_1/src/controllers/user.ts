import { TypeOrmConfig } from "../@config/typeorm.config.js";
import { User } from "../entity/user.entity.js";
import bcrypt from "bcryptjs";
import { OTP_EXPIRY } from "../@config/constants.config.js";
import { sendmail } from "../@helpers/sendmail.js";
import { defualtMailTemplate } from "../@helpers/mailTemplate.js";
import { CreateUserDto } from "../dtos/user.dto.js";
import { validate } from "class-validator";

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
    const payload = new CreateUserDto();

    payload.email = req.body.email;
    payload.full_name = req.body.full_name;
    payload.user_role = req.body.user_role;
    payload.password = req.body.password;
    payload.confirm_password = req.body.confirm_password;

    // Validation
    const errors = await validate(payload);

    if (errors.length > 0) {
      const v_error = errors.reduce((acc: any, error) => {
        // Destructuring error object and getting property and constraints
        // For e.g. property : password, constraint: minLength['password must be longer or than equal to 8 characters ]
        const { property, constraints } = error;
        acc[property] = Object.values(constraints || {});
        return acc;
      }, {});
      return next(res.status(400).json({ success: false, message: v_error }));
    }

    // check if user with same email exists
    const email_exists = await TypeOrmConfig.getRepository(User).findOne({
      where: { email: payload.email },
    });

    if (email_exists) {
      return next(
        res.status(400).json({
          success: false,
          message: "User with this email already exists",
        })
      );
    }

    if (payload.password !== payload.confirm_password) {
      return next(
        res
          .status(400)
          .json({ success: false, message: "Password didn't matched." })
      );
    }
    //   generate otp number
    const otp = Math.floor(Math.random() * 100000).toString();

    //   register new user
    const user = await TypeOrmConfig.getRepository(User).save({
      email: payload.email,
      full_name: payload.full_name,
      password: await bcrypt.hash(payload.password, 12),
      user_role: payload.user_role,
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
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

// ---------------------- EMAIL VERIFICATION ---------------------------------
export const emailVerify = async (req: any, res: any, next: any) => {
  
};
