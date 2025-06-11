import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { WeaponCategoryService } from './weapon-category.service';
import { CreateWeaponCategoryDto } from './dto/create-weapon-category.dto';
import { UpdateWeaponCategoryDto } from './dto/update-weapon-category.dto';

@Controller('weapon-category')
export class WeaponCategoryController {
  constructor(private readonly weaponCategoryService: WeaponCategoryService) { }

  @Post()
  create(@Body() createWeaponCategoryDto: CreateWeaponCategoryDto | CreateWeaponCategoryDto[]) {
    if (Array.isArray(createWeaponCategoryDto)) {
      return this.weaponCategoryService.bulkCreate(createWeaponCategoryDto);
    }
    return this.weaponCategoryService.create(createWeaponCategoryDto);
  }

  @Get()
  findAll(
    @Query('id', ParseIntPipe) id?: number,
  ) {
    if (id) {
      return this.weaponCategoryService.findOne(id);
    }
    return this.weaponCategoryService.findAll();
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
