import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProgranDTO {
  @IsString()
  @IsNotEmpty()
  day: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  typeTravel: string;
}

export class UpdateProgranDTO {
  @IsString()
  @IsOptional()
  day?: string;

  @IsString()
  @IsOptional()
  path?: string;

  @IsString()
  @IsOptional()
  typeTravel?: string;
}
