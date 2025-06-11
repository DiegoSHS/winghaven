import { Injectable } from '@nestjs/common';
import { CreateAttachmentcategoryDto } from './dto/create-attachmentcategory.dto';
import { UpdateAttachmentcategoryDto } from './dto/update-attachmentcategory.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AttachmentcategoryService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(createAttachmentcategoryDto: CreateAttachmentcategoryDto) {
    const result = await this.prisma.attachmentcategory.create({
      data: createAttachmentcategoryDto,
    });
    return result;
  }

  async bulkCreate(attachmentcategories: CreateAttachmentcategoryDto[]) {
    const result = await this.prisma.attachmentcategory.createMany({
      data: attachmentcategories,
    });
    return result;
  }

  async findAll() {
    const result = await this.prisma.attachmentcategory.findMany();
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.attachmentcategory.findUnique({
      where: { id },
    });
    return result;
  }

  async update(id: number, updateAttachmentcategoryDto: UpdateAttachmentcategoryDto) {
    const result = await this.prisma.attachmentcategory.update({
      where: { id },
      data: updateAttachmentcategoryDto,
    });
    return result;
  }

  async remove(id: number) {
    const result = await this.prisma.attachmentcategory.delete({
      where: { id },
    });
    return result;
  }
}