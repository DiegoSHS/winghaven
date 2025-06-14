import { Injectable } from '@nestjs/common';
import { CreateWeaponCategoryDto } from './dto/create-weapon-category.dto';
import { UpdateWeaponCategoryDto } from './dto/update-weapon-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WeaponCategoryService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createWeaponCategoryDto: CreateWeaponCategoryDto) {
    const result = await this.prisma.weaponCategory.create({
      data: createWeaponCategoryDto,
    });
    return result;
  }

  async bulkCreate(weaponCategories: CreateWeaponCategoryDto[]) {
    const result = await this.prisma.weaponCategory.createMany({
      data: weaponCategories,
      skipDuplicates: true,
    });
    return result;
  }

  async findAll() {
    const result = await this.prisma.weaponCategory.findMany();
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.weaponCategory.findUnique({
      where: { id },
    });
    return result;
  }
  async findByName(name: string) {
    const result = await this.prisma.weaponCategory.findUnique({
      where: { name },
    });
    return result;
  }
  async update(id: number, updateWeaponCategoryDto: UpdateWeaponCategoryDto) {
    const result = await this.prisma.weaponCategory.update({
      where: { id },
      data: updateWeaponCategoryDto,
    });
    return result;
  }

  async remove(id: number) {
    const result = await this.prisma.weaponCategory.delete({
      where: { id },
    });
    return result;
  }
}
