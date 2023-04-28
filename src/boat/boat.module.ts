import { Module } from '@nestjs/common';
import { BoatController } from './boat.controller';
import { BoatService } from './boat.service';

@Module({
  controllers: [BoatController],
  providers: [BoatService]
})
export class BoatModule {}
