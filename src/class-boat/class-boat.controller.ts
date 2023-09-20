import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ClassBoatService } from './class-boat.service';
import { CreateClassDTO } from './class-boat.dto';

@Controller('class-boat')
export class ClassBoatController {
  constructor(private readonly classBoatService: ClassBoatService) {}

  @Get()
  getAll() {
    return this.classBoatService.getAll();
  }

  @Get('boat/:boatId')
  getBoatClasses(@Param('boatId') boatId: string) {
    return this.classBoatService.getByBoat(boatId);
  }

  @Get(':id')
  getOneClass(@Param('id') id: string) {
    return this.classBoatService.getOne(id);
  }

  @Post(':boatId')
  createClass(@Param('boatId') boatId: string, @Body() dto: CreateClassDTO) {
    return this.classBoatService.createClass(boatId, dto);
  }

  @Put(':id')
  updateClass(@Param('id') id: string, @Body() dto: any) {
    return { message: 'updated' };
  }
}
