import { Injectable } from '@nestjs/common';
import { CreateAttachmentCategoryDto } from './dto/create-attachment-category.dto';
import { UpdateAttachmentCategoryDto } from './dto/update-attachment-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AttachmentCategoryService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAttachmentCategoryDto: CreateAttachmentCategoryDto) {
    const result = await this.prisma.attachmentCategory.create({
      data: createAttachmentCategoryDto,
    });
    return result;
  }

  async bulkCreate(attachmentCategories: CreateAttachmentCategoryDto[]) {
    const result = await this.prisma.attachmentCategory.createMany({
      data: attachmentCategories,
      skipDuplicates: true,
    });
    return result;
  }

  async findAll() {
    const result = await this.prisma.attachmentCategory.findMany({
      where: {
        name: {
          notIn: [
            'JAK Thumper-556',
            'Crossbow',
            'Lever',
            'Unique',
            'Torque 35',
            'Stock Pad',
          ],
        }
      }
    });
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.attachmentCategory.findUnique({
      where: { id },
    });
    return result;
  }

  async findByName(name: string) {
    const result = await this.prisma.attachmentCategory.findFirst({
      where: { name },
    });
    return result;
  }

  async update(
    id: number,
    updateAttachmentCategoryDto: UpdateAttachmentCategoryDto,
  ) {
    const result = await this.prisma.attachmentCategory.update({
      where: { id },
      data: updateAttachmentCategoryDto,
    });
    return result;
  }

  async remove(id: number) {
    const result = await this.prisma.attachmentCategory.delete({
      where: { id },
    });
    return result;
  }
}
