import { Module } from '@nestjs/common';
import { ClassBoatController } from './class-boat.controller';
import { ClassBoatService } from './class-boat.service';

@Module({
  controllers: [ClassBoatController],
  providers: [ClassBoatService]
})
export class ClassBoatModule {}
