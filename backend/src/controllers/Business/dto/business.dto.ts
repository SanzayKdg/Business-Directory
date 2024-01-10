import {
  IsArray,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import {
  BusinessAmenities,
  BusinessTimings,
} from "../../../@types/business.t.js";

export class SocialLinksDTO {
  @IsString()
  name!: string;

  @IsUrl()
  url!: string;
}
export class RegisterBusinessDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  logo!: any;

  @IsNotEmpty()
  @IsArray()
  image!: any[];

  @IsString()
  @MaxLength(10)
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsOptional()
  telephone!: string;

  @IsString()
  @IsNotEmpty()
  vat_number!: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsOptional()
  @ValidateNested()
  opening_hours!: BusinessTimings;

  @IsOptional()
  @ValidateNested()
  amenity?: BusinessAmenities[];

  @IsOptional()
  @IsArray()
  social_links?: SocialLinksDTO[];

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsLatitude()
  @IsOptional()
  latitude!: number;

  @IsLongitude()
  @IsOptional()
  longitude!: number;
}
export class UpdateBusinessDTO {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsOptional()
  logo!: any;

  @IsOptional()
  @IsArray()
  image!: any[];

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsOptional()
  telephone!: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsOptional()
  @ValidateNested()
  opening_hours!: BusinessTimings;

  @IsOptional()
  @ValidateNested()
  amenity?: BusinessAmenities[];

  @IsOptional()
  @IsArray()
  social_links?: SocialLinksDTO[];

  @IsString()
  @IsOptional()
  address!: string;

  @IsLatitude()
  @IsOptional()
  latitude!: number;

  @IsLongitude()
  @IsOptional()
  longitude!: number;
}
