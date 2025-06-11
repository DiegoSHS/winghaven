import { Module } from '@nestjs/common';
import { WeaponattachmentService } from './weaponattachment.service';
import { WeaponattachmentController } from './weaponattachment.controller';

@Module({
  controllers: [WeaponattachmentController],
  providers: [WeaponattachmentService],
})
export class WeaponattachmentModule {}
