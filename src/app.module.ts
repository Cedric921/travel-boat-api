import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BoatModule } from './boat/boat.module';
import { AgenceModule } from './agence/agence.module';
import { PrismaModule } from './prisma/prisma.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
@Module({
  imports: [
    BoatModule,
    AgenceModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
