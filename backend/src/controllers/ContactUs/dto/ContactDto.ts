import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from "class-validator";

export class ContactUSDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  last_name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
