import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBoatDTO {
  @IsString()
  @IsNotEmpty()
  designation;
}
