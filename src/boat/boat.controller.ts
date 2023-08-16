import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { multerConfig } from 'src/config/multer.config';
import { BoatService } from './boat.service';
import { Agence, Boat, BoatProgram, Class, Program } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/guard/roles.guard';

@Controller('boats')
export class BoatController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly boatService: BoatService,
  ) {}

  @Get()
  getAll(): Promise<{
    message: string;
    data: Boat[];
  }> {
    return this.boatService.findAll();
  }

  @Get('agence/:idAgence')
  getByAgence(
    @Param('idAgence') idAgence: string,
  ): Promise<Agence & { boats: Boat[] }> {
    return this.boatService.findByAgence(idAgence);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<{
    message: string;
    data: Boat & {
      agence: Agence;
      Class: Class[];
      BoatProgram: (BoatProgram & {
        Program: Program;
      })[];
    };
  }> {
    return this.boatService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['ADMIN', 'USER']))
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

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['ADMIN', 'USER']))
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.boatService.updateBoat(id, data);
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['ADMIN', 'USER']))
  @Put('image/:id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async updateBoatImage(
    @Param('id') id: string,
    @UploadedFile() file: any,
  ): Promise<any> {
    const res = await this.cloudinaryService.upload(file);
    return this.boatService.updateBoat(id, { url_profile: res.secure_url });
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['ADMIN', 'USER']))
  @Put('program/:id')
  associateProgram(
    @Param('id') id: string,
    @Body('programId') programId: string,
  ) {
    return this.boatService.associateProgram(id, programId);
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['ADMIN', 'USER']))
  @Delete('program/:id')
  dissociateProgram(@Param('id') id: string) {
    return this.boatService.dissociateProgram(id);
  }
}
