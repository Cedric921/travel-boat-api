import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: any): Promise<{
    message: string;
    data: {
      token: string;
      id: string;
      names: string;
      email: string;
      password: string;
      telephone: string;
      address: Prisma.JsonValue;
    };
  }> {
    try {
      // generate password
      const hash = await argon.hash(dto.password);

      // save custom and hash
      const custom = await this.prismaService.custom.create({
        data: {
          ...dto,
          password: hash,
        },
      });

      // delete custom password
      delete custom.password;
      // generate token
      const token = await this.generateToken(custom.id, custom.email);

      // return custom data
      return { message: 'custom created', data: { ...custom, token } };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log('line11', { error });
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken');
      } else {
        throw new ForbiddenException('Auth error');
      }
    }
  }

  async login(dto: any) {
    const user = await this.prismaService.custom.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwdMatches = await argon.verify(user.password, dto.password);

    if (!pwdMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const token = await this.generateToken(user.id, user.email);

    delete user.password;
    return { message: 'account  succes', data: { ...user, token } };
  }

  async generateToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
