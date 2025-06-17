import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { WeaponCategoryService } from './weapon-category.service';
import { CreateWeaponCategoryDto } from './dto/create-weapon-category.dto';
import { UpdateWeaponCategoryDto } from './dto/update-weapon-category.dto';
import { customIdPipe } from 'src/common/validation';

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
    @Query('id', customIdPipe) id?: number,
    @Query('name') name?: string,
  ) {
    if (id) return this.weaponCategoryService.findOne(id);
    if (name) return this.weaponCategoryService.findByName(name);
    return this.weaponCategoryService.findAll();
  }

  @Patch(':id')
  update(@Param('id', customIdPipe) id: number, @Body() updateWeaponCategoryDto: UpdateWeaponCategoryDto) {
    return this.weaponCategoryService.update(id, updateWeaponCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', customIdPipe) id: number) {
    return this.weaponCategoryService.remove(id);
  }
}
