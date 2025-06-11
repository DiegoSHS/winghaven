import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { WeaponAttachmentService } from './weapon-attachment.service';
import { CreateWeaponAttachmentDto } from './dto/create-weapon-attachment.dto';
import { UpdateWeaponAttachmentDto } from './dto/update-weapon-attachment.dto';

@Controller('weapon-attachment')
export class WeaponAttachmentController {
  constructor(private readonly weaponAttachmentService: WeaponAttachmentService) { }

  @Post()
  create(@Body() createWeaponAttachmentDto: CreateWeaponAttachmentDto | CreateWeaponAttachmentDto[]) {
    if (Array.isArray(createWeaponAttachmentDto)) {
      return this.weaponAttachmentService.bulkCreate(createWeaponAttachmentDto);
    }
    return this.weaponAttachmentService.create(createWeaponAttachmentDto);
  }

  @Get()
  findAll(
    @Query('weaponId', ParseIntPipe) weaponId?: number,
    @Query('attachmentId', ParseIntPipe) attachmentId?: number
  ) {
    if (weaponId && attachmentId) {
      return this.weaponAttachmentService.findOne(weaponId, attachmentId);
    }
    if (weaponId) {
      return this.weaponAttachmentService.findByWeaponId(weaponId);
    }
    if (attachmentId) {
      return this.weaponAttachmentService.findByAttachmentId(attachmentId);
    }
    return this.weaponAttachmentService.findAll();
  }

  @Patch()
  update(
    @Query('weaponId', ParseIntPipe) weaponId: number,
    @Query('attachmentId', ParseIntPipe) attachmentId,
    @Body() updateWeaponAttachmentDto: UpdateWeaponAttachmentDto
  ) {
    return this.weaponAttachmentService.update(weaponId, attachmentId, updateWeaponAttachmentDto);
  }

  @Delete()
  remove(
    @Query('weaponId', ParseIntPipe) weaponId: number,
    @Query('attachmentId', ParseIntPipe) attachmentId
  ) {
    return this.weaponAttachmentService.remove(weaponId, attachmentId);
  }
}
