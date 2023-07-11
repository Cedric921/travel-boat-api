import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClassImage } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassImageService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllImages(): Promise<ClassImage[]> {
    try {
      return await this.prismaService.classImage.findMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getByclassId(classId: string): Promise<ClassImage[]> {
    try {
      return await this.prismaService.classImage.findMany({
        where: {
          classId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createOne({ previewUrl, publicId, classId }): Promise<{
    message: string;
    data: ClassImage;
  }> {
    try {
      const image = await this.prismaService.classImage.create({
        data: { previewUrl, publicId, classId },
      });
      return { message: 'image saved', data: image };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: string): Promise<{
    message: string;
    data: ClassImage;
  }> {
    try {
      const deleted = await this.prismaService.classImage.delete({
        where: { id },
      });
      return { message: 'image deleted', data: deleted };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
