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
import { BoatService } from './boat.service';
import { Agence, Boat } from '@prisma/client';

@Controller('boats')
export class BoatController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly boatService: BoatService,
  ) {}

  @Get()
  getAll(): Promise<Boat[]> {
    return this.boatService.findAll();
  }

  @Get('agences/:idAgence')
  getByAgence(
    @Param('idAgence') idAgence: string,
  ): Promise<Agence & { boats: Boat[] }> {
    return this.boatService.findByAgence(idAgence);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Boat> {
    return this.boatService.findOne(id);
  }

  @Post(':idAgence')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async createBoat(
    @Param('idAgence') idAgence: string,
    @Body() body: any,
    @UploadedFile() file: any,
  ): Promise<any> {
    let secure_url = '';
    if (file) {
      secure_url = (await this.cloudinaryService.upload(file)).secure_url;
    }
    return this.boatService.createBoat(idAgence, {
      ...body,
      url_profile: secure_url,
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.boatService.updateBoat(id, data);
  }

  @Put('image/:id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async updateBoatImage(
    @Param('id') id: string,
    @UploadedFile() file: any,
  ): Promise<any> {
    const res = await this.cloudinaryService.upload(file);
    return this.boatService.updateBoat(id, { url_profile: res.secure_url });
  }
}
