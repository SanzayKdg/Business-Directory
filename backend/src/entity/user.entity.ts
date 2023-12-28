import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectIdColumn,
  ObjectId,
  OneToMany,
} from "typeorm";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRE, JWT_SECRET } from "../@config/constants.config.js";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  BUSINESS = "business",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@Entity({ name: "user" })
export class User {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  full_name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  user_role!: UserRole;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ default: false })
  is_verified?: boolean;

  @Column({ nullable: true, type: "date" })
  dob?: Date;

  @Column({ type: "enum", enum: Gender, default: Gender.OTHER })
  gender!: Gender;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  otp!: number | null;

  @Column({ nullable: true })
  otp_expiry!: Date | null;

  @CreateDateColumn()
  created_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  // relation

  // @Column(type => Business)
  //   businesses: Business[];

  // JWT TOKEN
  getJWTToken() {
    return jwt.sign({ id: this._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
  }

  // Compare password
  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
