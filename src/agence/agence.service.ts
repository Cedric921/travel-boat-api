import { PrismaService } from './../prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAgenceDto } from './agence.dto';

@Injectable()
export class AgenceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      const data = await this.prisma.agence.findMany({
        include: { boats: true },
      });
      return { message: 'get agences list ', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.agence.findUnique({
        where: { id },
        include: { boats: true },
      });
      return { message: 'get agence data', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(dto: CreateAgenceDto) {
    try {
      const data = await this.prisma.agence.create({ data: { ...dto } });
      return { message: 'create agence with success', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string) {
    try {
      const data = await this.prisma.agence.delete({
        where: { id },
        include: { boats: true },
      });
      return { message: ' agence data deleted', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, dto: any) {
    try {
      const data = await this.prisma.agence.update({
        where: { id },
        data: { ...dto },
      });
      return { message: 'update agence data with success', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
