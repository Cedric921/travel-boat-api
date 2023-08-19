import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Class, ClassImage, Ticket } from '@prisma/client';
import { CreateClassDTO } from './class-boat.dto';

@Injectable()
export class ClassBoatService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<{ message: string; data: Class[] }> {
    try {
      const data = await this.prismaService.class.findMany();
      return { message: 'classes found', data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getByBoat(boatId: string): Promise<{ message: string; data: Class[] }> {
    try {
      const data = await this.prismaService.class.findMany({
        where: { boatId },
      });
      return { message: 'boat classes fetched', data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: string): Promise<{
    message: string;
    data: Class & {
      ClassImage: ClassImage[];
      Ticket: Ticket[];
    };
  }> {
    try {
      const data = await this.prismaService.class.findFirst({
        where: { id },
        include: {
          ClassImage: true,
          Ticket: true,
        },
      });
      return { message: 'class data fetched', data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createClass(
    boatId: string,
    dto: CreateClassDTO,
  ): Promise<{ message: string; data: Class }> {
    try {
      const data = await this.prismaService.class.create({
        data: { ...dto, boatId },
      });
      return { message: 'class saved', data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
