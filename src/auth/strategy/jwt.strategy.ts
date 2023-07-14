import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    let user = null;
    const internalUser = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    const custom = await this.prisma.custom.findUnique({
      where: { id: payload.sub },
    });

    if (internalUser) {
      user = internalUser;
    } else if (custom) {
      user = { ...custom, role: 'CUSTOMER' };
    }

    delete user.password;

    return user;
  }
}
