import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
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
    @Body('gameId') gameId?: number,
    @Body('categoryId', customIdPipe) categoryId?: number,
  ) {
    if (Array.isArray(createWeaponDto)) {
      if (!gameId || !categoryId) throw new BadRequestException('gameId and categoryId are required for bulk creation');
      return this.weaponService.bulkCreate(gameId, categoryId, createWeaponDto);
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

  @Patch(':id')
  update(@Param('id', customIdPipe) id: number, @Body() updateWeaponDto: UpdateWeaponDto) {
    return this.weaponService.update(id, updateWeaponDto);
  }

  @Delete(':id')
  remove(@Param('id', customIdPipe) id: number) {
    return this.weaponService.remove(id);
  }
}
