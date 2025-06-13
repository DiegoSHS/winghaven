import { Module } from '@nestjs/common';
import { WeaponAttachmentService } from './weapon-attachment.service';
import { WeaponAttachmentController } from './weapon-attachment.controller';

@Module({
  controllers: [WeaponAttachmentController],
  providers: [WeaponAttachmentService],
})
export class WeaponAttachmentModule {}
