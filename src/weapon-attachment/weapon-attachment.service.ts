import { Injectable } from '@nestjs/common';
import { CreateWeaponAttachmentDto } from './dto/create-weapon-attachment.dto';
import { UpdateWeaponAttachmentDto } from './dto/update-weapon-attachment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WeaponAttachmentService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createWeaponAttachmentDto: CreateWeaponAttachmentDto) {
    const result = await this.prisma.weaponAttachment.create({
      data: createWeaponAttachmentDto,
    });
    return result;
  }

  async bulkCreate(weaponAttachments: CreateWeaponAttachmentDto[]) {
    const result = await this.prisma.weaponAttachment.createMany({
      data: weaponAttachments,
    });
    return result;
  }

  async findAll() {
    const result = await this.prisma.weaponAttachment.findMany();
    return result;
  }

  async findOne(weaponId: number, attachmentId: number) {
    const result = await this.prisma.weaponAttachment.findUnique({
      where: { weaponId_attachmentId: { weaponId, attachmentId } },
    });
    return result;
  }

  async update(weaponId: number, attachmentId: number, updateWeaponAttachmentDto: UpdateWeaponAttachmentDto) {
    const result = await this.prisma.weaponAttachment.update({
      where: { weaponId_attachmentId: { weaponId, attachmentId } },
      data: updateWeaponAttachmentDto,
    });
    return result;
  }

  async remove(weaponId: number, attachmentId: number) {
    const result = await this.prisma.weaponAttachment.delete({
      where: { weaponId_attachmentId: { weaponId, attachmentId } },
    });
    return result;
  }
}
