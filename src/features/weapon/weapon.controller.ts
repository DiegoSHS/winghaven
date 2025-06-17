import { Controller, Get, Post, Body, Param, Delete, BadRequestException, Put } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { customIdPipe } from 'src/common/validation';

@Controller('weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) { }

  @Post()
  create(
    @Body('data') createWeaponDto: CreateWeaponDto | CreateWeaponDto[],
    @Body('gameId', customIdPipe) gameId?: number,
    @Body('weaponCategoryId', customIdPipe) weaponCategoryId?: number,
  ) {
    if (Array.isArray(createWeaponDto)) {
      if (!gameId || !weaponCategoryId) return this.weaponService.bulkCreate(createWeaponDto);
      const transformedWeapons = createWeaponDto.map(weapon => ({
        ...weapon,
        gameId,
        weaponCategoryId,
      }))
      return this.weaponService.bulkCreate(transformedWeapons);
    }
    return this.weaponService.create(createWeaponDto);
  }

  @Get()
  findAll(
    @Param('id', customIdPipe) id?: number,
  ) {
    if (id) return this.weaponService.findOne(id);
    return this.weaponService.findAll();
  }

  @Get('search')
  search(@Param('name') name?: string) {
    if (!name) return [];
    if (name) return this.weaponService.filterByName(name);
  }

  @Put(':id')
  update(@Param('id', customIdPipe) id: number, @Body() updateWeaponDto: UpdateWeaponDto) {
    return this.weaponService.update(id, updateWeaponDto);
  }

  @Delete(':id')
  remove(@Param('id', customIdPipe) id: number) {
    return this.weaponService.remove(id);
  }
}
