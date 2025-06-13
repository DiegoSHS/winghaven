import { Test, TestingModule } from '@nestjs/testing';
import { WeaponAttachmentService } from './weapon-attachment.service';

describe('WeaponAttachmentService', () => {
  let service: WeaponAttachmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeaponAttachmentService],
    }).compile();

    service = module.get<WeaponAttachmentService>(WeaponAttachmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
