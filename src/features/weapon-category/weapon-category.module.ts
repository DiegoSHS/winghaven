import { Module } from '@nestjs/common';
import { WeaponCategoryService } from './weapon-category.service';
import { WeaponCategoryController } from './weapon-category.controller';

@Module({
  controllers: [WeaponCategoryController],
  providers: [WeaponCategoryService],
  exports: [WeaponCategoryService],
})
export class WeaponCategoryModule { }
