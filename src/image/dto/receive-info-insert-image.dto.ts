import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReceiveInfoAndInsertInImage {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  author: string;
}
