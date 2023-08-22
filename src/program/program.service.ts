import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddBoatProgram, AddBoatPrograms, CreateProgranDTO } from './dto';

@Injectable()
export class ProgramService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAll() {
    try {
      const data = await this.prismaService.program.findMany();
      return { message: 'program fetched', data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: string) {
    try {
      const data = await this.prismaService.program.findFirst({
        where: { id },
        include: { BoatProgram: { include: { Boat: true } } },
      });
      return { message: 'program fetched', data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createOne(dto: CreateProgranDTO) {
    try {
      const data = await this.prismaService.program.create({
        data: { ...dto },
      });
      return { message: 'program created', data };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async createBoatProgram(dto: AddBoatProgram) {
    try {
      const res = await this.prismaService.boatProgram.create({
        data: {
          boatId: dto.boatId,
          programId: dto.programId,
        },
      });

      const data = await this.prismaService.boatProgram.findUnique({
        where: { id: res.id },
        include: {
          Boat: true,
          Program: true,
        },
      });

      return { message: 'program created', data };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async createBoatPrograms(dto: AddBoatPrograms) {
    try {
      dto.programIds.map(async (programId) => {
        const exist = await this.prismaService.boatProgram.findFirst({
          where: {
            boatId: dto.boatId,
            programId,
          },
        });
        if (!exist) {
          await this.prismaService.boatProgram.create({
            data: {
              boatId: dto.boatId,
              programId: programId,
            },
          });
        }
      });

      const data = await this.prismaService.boatProgram.findMany({
        where: { boatId: dto.boatId },
        include: {
          Boat: true,
          Program: true,
        },
      });

      return { message: 'program created', data };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateById(id: string, dto: any) {
    try {
      const data = await this.prismaService.program.update({
        data: { ...dto },
        where: { id },
      });
      return { message: 'program updated', data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteById(id: string) {
    try {
      const data = await this.prismaService.program.delete({ where: { id } });
      return { message: 'program deleted', data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteBoatProgram(id: string) {
    try {
      const data = await this.prismaService.boatProgram.delete({
        where: { id },
      });
      return { message: 'boat program deleted', data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
