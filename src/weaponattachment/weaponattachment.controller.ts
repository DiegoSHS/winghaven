import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeaponattachmentService } from './weaponattachment.service';
import { CreateWeaponattachmentDto } from './dto/create-weaponattachment.dto';
import { UpdateWeaponattachmentDto } from './dto/update-weaponattachment.dto';

@Controller('weaponattachment')
export class WeaponattachmentController {
  constructor(private readonly weaponattachmentService: WeaponattachmentService) {}

  @Post()
  create(@Body() createWeaponattachmentDto: CreateWeaponattachmentDto) {
    return this.weaponattachmentService.create(createWeaponattachmentDto);
  }

  @Get()
  findAll() {
    return this.weaponattachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weaponattachmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeaponattachmentDto: UpdateWeaponattachmentDto) {
    return this.weaponattachmentService.update(+id, updateWeaponattachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weaponattachmentService.remove(+id);
  }
}
