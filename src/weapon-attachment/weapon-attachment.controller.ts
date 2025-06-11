import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeaponAttachmentService } from './weapon-attachment.service';
import { CreateWeaponAttachmentDto } from './dto/create-weapon-attachment.dto';
import { UpdateWeaponAttachmentDto } from './dto/update-weapon-attachment.dto';

@Controller('weapon-attachment')
export class WeaponAttachmentController {
  constructor(private readonly weaponAttachmentService: WeaponAttachmentService) {}

  @Post()
  create(@Body() createWeaponAttachmentDto: CreateWeaponAttachmentDto) {
    return this.weaponAttachmentService.create(createWeaponAttachmentDto);
  }

  @Get()
  findAll() {
    return this.weaponAttachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weaponAttachmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeaponAttachmentDto: UpdateWeaponAttachmentDto) {
    return this.weaponAttachmentService.update(+id, updateWeaponAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weaponAttachmentService.remove(+id);
  }
}
