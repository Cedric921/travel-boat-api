import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClassBoatService } from './class-boat.service';

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
  createClass(@Param('boatId') boatId: string, @Body() dto: any) {
    return this.classBoatService.createClass(boatId, dto);
  }
}
