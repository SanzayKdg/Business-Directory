import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterBusinessDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  logo!: string;

  @IsString()
  
  image!: string;

  @IsString()
  phone_number!: string;

  @IsString()
  telephone!: string;

  @IsString()
  vat_number!: string;

  @IsString()
  website!: string;

  @IsString()
  category!: string;

  @IsString()
  opening_hours!: string;

  @IsString()
  amenitiy!: string;

  @IsString()
  social_links!: string;

  @IsString()
  account_status!: string;

  @IsString()
  address!: string;
}
