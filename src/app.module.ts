import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaService} from './prisma.service'
import { PrismaService } from './prisma/prisma.service';
import { BoatModule } from './boat/boat.module';
import { AgenceModule } from './agence/agence.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [BoatModule, AgenceModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
