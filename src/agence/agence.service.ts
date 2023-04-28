import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AgenceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.agence.findMany({
      include: { boats: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.agence.findUnique({
      where: { id },
      include: { boats: true },
    });
  }

  async create(data: any) {
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
