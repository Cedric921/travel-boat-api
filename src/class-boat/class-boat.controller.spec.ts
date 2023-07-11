import { Test, TestingModule } from '@nestjs/testing';
import { ClassBoatController } from './class-boat.controller';

describe('ClassBoatController', () => {
  let controller: ClassBoatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassBoatController],
    }).compile();

    controller = module.get<ClassBoatController>(ClassBoatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
