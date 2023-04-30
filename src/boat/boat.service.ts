import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { Agence, Boat } from '@prisma/client';

@Injectable()
export class BoatService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Boat[]> {
    return await this.prismaService.boat.findMany();
  }

  async findOne(id: string): Promise<Boat> {
    return await this.prismaService.boat.findUnique({
      where: { id },
      include: { agence: true },
    });
  }

  async findByAgence(idAgence: string): Promise<Agence & { boats: Boat[] }> {
    return await this.prismaService.agence.findUnique({
      where: { id: idAgence },
      include: { boats: true },
    });
  }

  async createBoat(data: any): Promise<Boat> {
    return await this.prismaService.boat.create(data);
  }
}
