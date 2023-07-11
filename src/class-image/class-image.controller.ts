import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClassImageService } from './class-image.service';

@Controller('class-image')
export class ClassImageController {
  constructor(private readonly classImageService: ClassImageService) {}

  @Get()
  getAll() {
    return { messgae: 'all images' };
  }

  @Get('class/:id')
  getClassImages(@Param('id') classId: string) {
    return { message: 'get images for class', classId };
  }

  @Post(':id')
  addClassImage(@Param('id') classId: string, @Body() dto: any) {
    return { message: 'create image', classId, dto };
  }

  @Delete(':id')
  removeImage(@Param('id') id: string) {
    return { message: 'remove image to class', id };
  }
}
