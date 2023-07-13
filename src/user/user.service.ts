import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: any) {
    try {
      return await this.prismaService.user.create({ data: dto });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAll() {
    try {
      return await this.prismaService.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: string) {
    try {
      return await this.prismaService.user.findFirst({
        where: { id },
        include: { Agence: true },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateById(id: string, dto: any) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
