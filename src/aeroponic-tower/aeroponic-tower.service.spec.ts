import { Test, TestingModule } from '@nestjs/testing';
import { AeroponicTowerService } from './aeroponic-tower.service';

describe('AeroponicTowerService', () => {
  let service: AeroponicTowerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AeroponicTowerService],
    }).compile();

    service = module.get<AeroponicTowerService>(AeroponicTowerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
