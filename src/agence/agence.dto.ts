import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

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

export class UpdateAgenceDTO {
  @IsOptional()
  @IsString()
  designation: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  tel: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  sigle: string;
}
