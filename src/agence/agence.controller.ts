import { AgenceService } from './agence.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('agences')
export class AgenceController {
  constructor(private readonly agenceService: AgenceService) {}

  @Get()
  getAll() {
    return this.agenceService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.agenceService.findOne(id);
  }

  @Post()
  create(@Body() agenceDTO) {
    return this.agenceService.create(agenceDTO);
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() updateAgenceDTO) {
    return this.agenceService.update(id, updateAgenceDTO);
  }
}
