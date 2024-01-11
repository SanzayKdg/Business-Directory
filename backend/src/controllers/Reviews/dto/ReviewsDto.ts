import {
  IsInt,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class NewReviewDTO {
  @IsInt()
   @IsNotEmpty()
  rating!: number;

  @IsString()
  @IsNotEmpty()
  comment!: string;
}
