import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { Agence, Boat } from '@prisma/client';

@Injectable()
export class BoatService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Boat[]> {
    try {
      return await this.prismaService.boat.findMany();
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<Boat> {
    try {
      return await this.prismaService.boat.findUnique({
        where: { id },
        include: { agence: true },
      });
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }

  async findByAgence(idAgence: string): Promise<Agence & { boats: Boat[] }> {
    try {
      return await this.prismaService.agence.findUnique({
        where: { id: idAgence },
        include: { boats: true },
      });
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
}
