import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClassImageService } from './class-image.service';
import { multerConfig } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('class-image')
export class ClassImageController {
  constructor(
    private readonly classImageService: ClassImageService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  getAll() {
    return this.classImageService.getAllImages();
  }

  @Get('class/:id')
  getClassImages(@Param('id') classId: string) {
    return this.classImageService.getByclassId(classId);
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async addClassImage(@Param('id') classId: string, @UploadedFile() file: any) {
    try {
      if (!file) throw new BadRequestException();

      const res = await this.cloudinaryService.upload(file);

      return this.classImageService.createOne({
        classId,
        previewUrl: res.secure_url,
        publicId: res.public_id,
      });
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Delete(':id')
  removeImage(@Param('id') id: string) {
    return this.classImageService.deleteOne(id);
  }
}
