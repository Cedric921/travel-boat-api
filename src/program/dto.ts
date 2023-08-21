import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

export class AddBoatProgram {
  @IsString()
  @IsNotEmpty()
  boatId: string;

  @IsString()
  @IsNotEmpty()
  programId: string;
}

export class AddBoatPrograms {
  @IsString()
  @IsNotEmpty()
  boatId: string;

  @IsArray()
  @IsNotEmpty()
  programIds: string[];
}
