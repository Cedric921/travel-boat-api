import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { Agence, User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: any) {
    try {
      const defaultPwd = await argon.hash('123456');

      const data = await this.prismaService.user.create({
        data: { ...dto, password: defaultPwd },
      });
      return { message: 'user created', data };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getAll() {
    try {
      const users = await this.prismaService.user.findMany();
      return { message: 'users fetched', data: users };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAgenceUsers(agenceId: string): Promise<{
    message: string;
    data: User[];
  }> {
    try {
      const data = await this.prismaService.user.findMany({
        where: {
          agenceId,
        },
      });
      return { message: 'agence users', data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: string): Promise<{
    message: string;
    data: User & {
      Agence: Agence;
    };
  }> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { id },
        include: { Agence: true },
      });
      return { message: 'user fetched', data: user };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAdmins(): Promise<{
    message: string;
    data: User[];
  }> {
    try {
      const data = await this.prismaService.user.findMany({
        where: {
          role: 'ADMIN',
        },
      });
      return { message: 'admins fetched', data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateById(
    id: string,
    dto: any,
  ): Promise<{
    message: string;
    data: User;
  }> {
    try {
      const data = await this.prismaService.user.update({
        where: { id },
        data: dto,
      });
      return { message: 'user updated', data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
