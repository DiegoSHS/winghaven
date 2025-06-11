import { Test, TestingModule } from '@nestjs/testing';
import { WeaponattachmentService } from './weaponattachment.service';

describe('WeaponattachmentService', () => {
  let service: WeaponattachmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeaponattachmentService],
    }).compile();

    service = module.get<WeaponattachmentService>(WeaponattachmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
