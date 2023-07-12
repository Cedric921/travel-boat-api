import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BoatModule } from './boat/boat.module';
import { AgenceModule } from './agence/agence.module';
import { PrismaModule } from './prisma/prisma.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ClassImageModule } from './class-image/class-image.module';
import { ClassBoatModule } from './class-boat/class-boat.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { ProgramModule } from './program/program.module';
import { AppLoggerMiddleware } from './log.middleware';
@Module({
  imports: [
    BoatModule,
    AgenceModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CloudinaryModule,
    ClassImageModule,
    ClassBoatModule,
    UserModule,
    TicketModule,
    ProgramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
