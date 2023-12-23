import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { Transform } from "class-transformer";
import { UserRole } from "../entity/user.entity.js";
export class CreateUserDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
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
  otp!: number;
}
