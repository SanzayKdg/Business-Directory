import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRE, JWT_SECRET } from "../@config/constants.config.js";
import { Gender, UserRole } from "../@types/user.t.js";
interface UserDocument extends Document {
  full_name: string;
  email: string;
  password: string;
  user_role: UserRole;
  phone_number: string;
  is_verified: boolean;
  birth_date: Date;
  gender: Gender;
  avatar: string;
  address: string;
  otp: Number | null;
  otp_expiry: Date | null;
  getJWTToken: Function;
  comparePassword: Function;
}
const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Please enter your name."],
      minLength: [3, "Name must be atleast 3 characters long."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password."],
      minLength: [8, "Password must not be less than 8 characters."],
    },
    user_role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    phone_number: {
      type: String,
      maxLength: [10, "Phone number must be 10 digits number."],
      minlength: [10, "Phone number must be 10 digits number."],
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    birth_date: { type: Date },
    gender: {
      type: String,
      enum: Object.values(Gender),
      default: Gender.OTHER,
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
    },
    otp: Number,
    otp_expiry: Date,
  },
  { timestamps: true }
);

// ---------- Password Hashing ----------

userSchema.pre("save", async function (next: any) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ---------- JWT TOKEN ----------

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

// ---------- COMPARE PASSWORD ----------

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model<UserDocument>("User", userSchema);
