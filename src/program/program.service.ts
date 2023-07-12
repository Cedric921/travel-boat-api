import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProgramService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAll() {
    try {
      return await this.prismaService.program.findMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: string) {
    try {
      return await this.prismaService.program.findFirst({
        where: { id },
        include: { BoatProgram: { include: { boat: true } } },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async ceateOne(dto: any) {
    try {
      return await this.prismaService.program.create({ data: { ...dto } });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateById(id: string, dto: any) {
    try {
      return await this.prismaService.program.update({
        data: { ...dto },
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteById(id: string) {
    try {
      return await this.prismaService.program.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
