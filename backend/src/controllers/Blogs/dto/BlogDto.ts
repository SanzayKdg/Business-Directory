import {
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { BlogCategory } from "../../../@types/blogs.t.js";

export class CreateBlogDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(BlogCategory)
  @IsNotEmpty()
  category!: BlogCategory;

  @IsOptional()
  cover?: any;

  @IsArray()
  @IsOptional()
  image?: any[];

  @IsArray()
  @IsOptional()
  tags?: string[];
}

export class UpdateBlogDTO {
  @IsString()
  @IsOptional()
  title!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsEnum(BlogCategory)
  @IsOptional()
  category!: BlogCategory;

  @IsString()
  @IsOptional()
  description!: string;

  @IsOptional()
  cover?: any;

  @IsArray()
  @IsOptional()
  image?: any[];

  @IsArray()
  @IsOptional()
  tags?: string[];
}

export class NewBlogReviewsDTO {
  @IsInt()
  @IsNotEmpty()
  rating!: number;

  @IsString()
  @IsNotEmpty()
  comment!: string;
}
