import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Class } from '@prisma/client';

@Injectable()
export class ClassBoatService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Class[]> {
    try {
      return await this.prismaService.class.findMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getByBoat(boatId: string): Promise<Class[]> {
    try {
      return await this.prismaService.class.findMany({ where: { boatId } });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: string): Promise<Class> {
    try {
      return await this.prismaService.class.findFirst({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createClass(boatId: string, dto: any): Promise<Class> {
    try {
      return await this.prismaService.class.create({
        data: { ...dto, boatId },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
