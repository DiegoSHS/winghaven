import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeaponCategoryService } from './weapon-category.service';
import { CreateWeaponCategoryDto } from './dto/create-weapon-category.dto';
import { UpdateWeaponCategoryDto } from './dto/update-weapon-category.dto';

@Controller('weapon-category')
export class WeaponCategoryController {
  constructor(private readonly weaponCategoryService: WeaponCategoryService) {}

  @Post()
  create(@Body() createWeaponCategoryDto: CreateWeaponCategoryDto) {
    return this.weaponCategoryService.create(createWeaponCategoryDto);
  }

  @Get()
  findAll() {
    return this.weaponCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weaponCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeaponCategoryDto: UpdateWeaponCategoryDto) {
    return this.weaponCategoryService.update(+id, updateWeaponCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weaponCategoryService.remove(+id);
  }
}
