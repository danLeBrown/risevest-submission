import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  post_id: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
