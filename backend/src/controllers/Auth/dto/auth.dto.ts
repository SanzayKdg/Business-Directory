import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { Transform } from "class-transformer";
import { Gender, UserRole } from "../../../@types/user.t.js";

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
export class UpdateUserDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  email!: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  full_name!: string;

  @IsEnum([UserRole.BUSINESS, UserRole.USER])
  @IsIn([UserRole.BUSINESS, UserRole.USER])
  @IsOptional()
  phone_number!: string;

  @IsDateString()
  @IsOptional()
  dob!: Date;

  @IsOptional()
  @IsEnum([Gender.MALE, Gender.FEMALE, Gender.OTHER])
  @IsIn([Gender.MALE, Gender.FEMALE, Gender.OTHER])
  gender!: Gender;

  @IsString()
  @IsOptional()
  avatar!: string;

  @IsString()
  @IsOptional()
  address!: string;
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
