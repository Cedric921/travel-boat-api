import { PrismaService } from './../prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAgenceDto } from './agence.dto';

@Injectable()
export class AgenceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.agence.findMany({
        include: { boats: true },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    return await this.prisma.agence.findUnique({
      where: { id },
      include: { boats: true },
    });
  }

  async create(data: CreateAgenceDto) {
    return await this.prisma.agence.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.agence.delete({
      where: { id },
      include: { boats: true },
    });
  }

  async update(id: string, data: any) {
    return await this.prisma.agence.update({
      where: { id },
      data,
    });
  }
}
