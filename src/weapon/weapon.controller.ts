import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';

@Controller('weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) { }

  @Post()
  create(@Body() createWeaponDto: CreateWeaponDto | CreateWeaponDto[]) {
    if (Array.isArray(createWeaponDto)) {
      return this.weaponService.bulkCreate(createWeaponDto);
    }
    return this.weaponService.create(createWeaponDto);
  }

  @Get()
  findAll(
    @Param('id', ParseIntPipe) id?: number,
  ) {
    if (id) {
      return this.weaponService.findOne(id);
    }
    return this.weaponService.findAll();
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateWeaponDto: UpdateWeaponDto) {
    return this.weaponService.update(id, updateWeaponDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.weaponService.remove(id);
  }
}
