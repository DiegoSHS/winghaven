import { PartialType } from '@nestjs/mapped-types';
import { CreateWeaponCategoryDto } from './create-weapon-category.dto';

export class UpdateWeaponCategoryDto extends PartialType(CreateWeaponCategoryDto) {}
