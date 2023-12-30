import { Type } from "class-transformer";
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
  // @Type(() => BusinessTimings)
  opening_hours!: BusinessTimings;

  @IsOptional()
  @ValidateNested()
  // @Type(() => BusinessAmenities)
  amenity?: BusinessAmenities[];

  @IsOptional()
  @IsArray()
  // @Type(() => SocialLinksDTO)
  social_links?: SocialLinksDTO[];

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsLatitude()
  latitude!: number;

  @IsLongitude()
  longitude!: number;
}
