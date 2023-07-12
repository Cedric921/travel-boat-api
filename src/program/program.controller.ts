import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { CreateProgranDTO, UpdateProgranDTO } from './dto';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Get()
  getAll() {
    return this.programService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.programService.getOne(id);
  }

  @Post()
  create(@Body() dto: CreateProgranDTO) {
    return this.programService.ceateOne(dto);
  }

  @Put(':id')
  updateById(@Param('id') id: string, @Body() updateDto: UpdateProgranDTO) {
    return this.programService.updateById(id, updateDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.programService.deleteById(id);
  }
}
