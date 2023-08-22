import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import {
  Agence,
  Boat,
  BoatProgram,
  Class,
  ClassImage,
  Program,
  Ticket,
} from '@prisma/client';

@Injectable()
export class BoatService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<{
    message: string;
    data: Boat[];
  }> {
    try {
      const boats = await this.prismaService.boat.findMany({
        include: {
          Class: true,
        },
      });
      return { message: 'boats found', data: boats };
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<{
    message: string;
    data: Boat & {
      agence: Agence;
      Class: (Class & {
        ClassImage: ClassImage[];
        Ticket: Ticket[];
      })[];
      BoatProgram: (BoatProgram & {
        Program: Program;
      })[];
    };
  }> {
    try {
      const data = await this.prismaService.boat.findUnique({
        where: { id },
        include: {
          agence: true,
          Class: { include: { ClassImage: true, Ticket: true } },
          BoatProgram: { include: { Program: true } },
        },
      });
      return { message: 'data found', data };
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }

  async findByAgence(idAgence: string): Promise<{
    message: string;
    data: (Boat & {
      agence: Agence;
      Class: Class[];
    })[];
  }> {
    try {
      const data = await this.prismaService.boat.findMany({
        where: { agenceId: idAgence },
        include: { agence: true, Class: true },
      });
      return { message: 'boats found', data };
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }

  async createBoat(idAgence: string, data: any): Promise<Boat> {
    try {
      const agence: Agence = await this.prismaService.agence.findUnique({
        where: { id: idAgence },
      });

      if (!agence) throw new BadRequestException();

      return await this.prismaService.boat.create({
        data: {
          agenceId: idAgence,
          ...data,
        },
      });
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }

  async updateBoat(id: string, data: any) {
    try {
      return await this.prismaService.boat.update({
        data,
        where: { id },
      });
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }

  async associateProgram(boatId: string, programId: string) {
    try {
      const exist = this.prismaService.boatProgram.findFirst({
        where: { boatId, programId },
      });

      if (exist) {
        throw new BadRequestException('already exist');
      }

      return await this.prismaService.boatProgram.create({
        data: { boatId, programId },
      });
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }

  async dissociateProgram(id: string) {
    try {
      const exist = this.prismaService.boatProgram.findFirst({
        where: { id },
      });

      if (!exist) {
        throw new BadRequestException('program must exist first to this boat');
      }

      return await this.prismaService.boatProgram.delete({ where: { id } });
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }
}
