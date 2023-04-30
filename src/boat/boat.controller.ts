import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { multerConfig } from 'src/config/multer.config';

@Controller('boats')
export class BoatController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Get()
  getAll() {
    return { message: 'get all boats' };
  }

  @Get('agences/:idAgence')
  getByAgence(@Param('idAgence') idAgence: string) {
    return { message: 'get one', idAgence };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return { message: 'get one', id };
  }

  @Post(':idAgence')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async createBoat(
    @Param('idAgence') idAgence: string,
    @Body() body: any,
    @UploadedFile() file: any,
  ): Promise<any> {
    const result = await this.cloudinaryService.upload(file);
    return { url_preview: result.secure_url };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return { message: 'update ', id, data };
  }
}
