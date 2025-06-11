import { Injectable } from '@nestjs/common';
import { CreateLoadoutAttachmentDto } from './dto/create-loadout-attachment.dto';
import { UpdateLoadoutAttachmentDto } from './dto/update-loadout-attachment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LoadoutAttachmentService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createLoadoutAttachmentDto: CreateLoadoutAttachmentDto) {
    const result = await this.prisma.loadoutAttachment.create({
      data: createLoadoutAttachmentDto,
    });
    return result;
  }

  async bulkCreate(loadoutAttachments: CreateLoadoutAttachmentDto[]) {
    const result = await this.prisma.loadoutAttachment.createMany({
      data: loadoutAttachments,
    });
    return result;
  }

  async findAll() {
    const result = await this.prisma.loadoutAttachment.findMany();
    return result;
  }

  async findOne(
    loadoutId: number,
    attachmentId: number,
  ) {
    const result = await this.prisma.loadoutAttachment.findUnique({
      where: { loadoutId_attachmentId: { attachmentId, loadoutId } },
    });
    return result;
  }

  async findByLoadoutId(loadoutId: number) {
    const result = await this.prisma.loadoutAttachment.findMany({
      where: { loadoutId },
    });
    return result;
  }

  async findByAttachmentId(attachmentId: number) {
    const result = await this.prisma.loadoutAttachment.findMany({
      where: { attachmentId },
    });
    return result;
  }

  async update(
    loadoutId: number,
    attachmentId: number,
    updateLoadoutAttachmentDto: UpdateLoadoutAttachmentDto,
  ) {
    const result = await this.prisma.loadoutAttachment.update({
      where: { loadoutId_attachmentId: { loadoutId, attachmentId } },
      data: updateLoadoutAttachmentDto,
    });
    return result;
  }

  async remove(
    loadoutId: number,
    attachmentId: number,
  ) {
    const result = await this.prisma.loadoutAttachment.delete({
      where: { loadoutId_attachmentId: { loadoutId, attachmentId } },
    });
    return result;
  }
}
