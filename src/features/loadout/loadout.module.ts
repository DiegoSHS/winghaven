import { Module } from '@nestjs/common';
import { LoadoutService } from './loadout.service';
import { LoadoutController } from './loadout.controller';
import { ImageModule } from '../image/image.module';
import { WeaponModule } from '../weapon/weapon.module';
import { AttachmentModule } from '../attachment/attachment.module';
import { WeaponCategoryModule } from '../weapon-category/weapon-category.module';
import { AttachmentCategoryModule } from '../attachment-category/attachment-category.module';

@Module({
  imports: [ImageModule, WeaponModule, AttachmentModule, WeaponCategoryModule, AttachmentCategoryModule],
  controllers: [LoadoutController],
  providers: [LoadoutService],
})
export class LoadoutModule { }
