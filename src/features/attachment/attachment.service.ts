import { Injectable } from '@nestjs/common';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AttachmentService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async create(createAttachmentDto: CreateAttachmentDto) {
    const result = await this.prisma.attachment.create({
      data: createAttachmentDto,
    });
    return result;
  }

  async bulkCreate(attachments: CreateAttachmentDto[]) {
    const result = await this.prisma.attachment.createMany({
      data: attachments,
    });
    return result;
  }

  async findAll() {
    const attachments = await this.prisma.attachment.findMany();
    return attachments;
  }

  async findOne(id: number) {
    const attachment = await this.prisma.attachment.findUnique({
      where: { id },
    });
    return attachment;
  }

  async findByName(name: string) {
    const attachment = await this.prisma.attachment.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        }
      },
    });
    return attachment;
  }

  async update(id: number, updateAttachmentDto: UpdateAttachmentDto) {
    const result = await this.prisma.attachment.update({
      where: { id },
      data: updateAttachmentDto,
    });
    return result;
  }

  async updateMany(
    updateAttachmentDto: UpdateAttachmentDto,
    updateIds: number[],
  ) {
    const result = await this.prisma.attachment.updateMany({
      where: { id: { in: updateIds } },
      data: updateAttachmentDto,
    });
    return result;
  }

  async remove(id: number) {
    const result = this.prisma.attachment.delete({
      where: { id },
    });
    return result;
  }
}
