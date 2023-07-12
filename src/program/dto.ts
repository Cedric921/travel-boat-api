import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProgranDTO {
  @IsString()
  @IsNotEmpty()
  day: string;

  @IsString()
  @IsNotEmpty()
  trajectory: string;

  @IsString()
  @IsNotEmpty()
  beginTavelTime: string;
}

export class UpdateProgranDTO {
  @IsString()
  @IsOptional()
  day?: string;

  @IsString()
  @IsOptional()
  trajectory?: string;

  @IsString()
  @IsOptional()
  beginTavelTime?: string;
}
