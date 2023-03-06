import { Test, TestingModule } from '@nestjs/testing';
import { AeroponicTowerController } from './aeroponic-tower.controller';

describe('AeroponicTowerController', () => {
  let controller: AeroponicTowerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AeroponicTowerController],
    }).compile();

    controller = module.get<AeroponicTowerController>(AeroponicTowerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
