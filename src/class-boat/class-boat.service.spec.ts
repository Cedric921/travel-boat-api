import { Test, TestingModule } from '@nestjs/testing';
import { ClassBoatService } from './class-boat.service';

describe('ClassBoatService', () => {
  let service: ClassBoatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassBoatService],
    }).compile();

    service = module.get<ClassBoatService>(ClassBoatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
