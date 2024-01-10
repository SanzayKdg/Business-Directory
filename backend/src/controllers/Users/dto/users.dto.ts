import { Transform } from "class-transformer";
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
import { Gender, UserRole } from "../../../@types/user.t.js";

export class UpdateProfileDTO {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  email!: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  full_name!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @IsOptional()
  phone_number!: string;

  @IsDateString()
  @IsOptional()
  birth_date!: Date;

  @IsOptional()
  @IsEnum([Gender.MALE, Gender.FEMALE, Gender.OTHER])
  @IsIn([Gender.MALE, Gender.FEMALE, Gender.OTHER])
  gender!: Gender;

  @IsString()
  @IsOptional()
  avatar!: string | null;

  @IsString()
  @IsOptional()
  address!: string;
}

export class UpdatePasswordDTO {
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  old_password!: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  new_password!: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  confirm_password!: string;
}

export class RequestResetPasswordDTO {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email!: string;
}
export class ResetPasswordDTO {
  @IsNumber()
  @IsNotEmpty()
  otp!: number;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  new_password!: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  confirm_password!: string;
}
