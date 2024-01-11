import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

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

  @IsOptional()
  cover?: any;

  @IsArray()
  @IsOptional()
  image?: any[];

  @IsArray()
  @IsOptional()
  tags?: string[];
}
