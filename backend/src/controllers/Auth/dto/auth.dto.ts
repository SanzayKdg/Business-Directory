import { Transform } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from "class-validator";
import { UserRole } from "../../../@types/user.t.js";

export class CreateUserDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  full_name!: string;

  @IsEnum([UserRole.BUSINESS, UserRole.USER])
  @IsIn([UserRole.BUSINESS, UserRole.USER])
  @IsNotEmpty()
  user_role!: UserRole;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password!: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  confirm_password!: string;
}

export class VerifyEmailDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  email!: string;

  @IsNumber()
  @IsNotEmpty()
  otp!: number;
}
export class LoginDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
