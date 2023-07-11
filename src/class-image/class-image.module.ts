import { Module } from '@nestjs/common';
import { ClassImageController } from './class-image.controller';
import { ClassImageService } from './class-image.service';

@Module({
  controllers: [ClassImageController],
  providers: [ClassImageService],
})
export class ClassImageModule {}
