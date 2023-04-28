import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAgenceDto {
  @IsNotEmpty()
  @IsString()
  designation: string;

  @IsEmail()
  email: string;

  @IsString()
  tel: string;

  @IsString()
  address: string;

  @IsString()
  sigle: string;
}
