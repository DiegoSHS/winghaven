import { Injectable } from '@nestjs/common';
import { CreateWeaponcategoryDto } from './dto/create-weaponcategory.dto';
import { UpdateWeaponcategoryDto } from './dto/update-weaponcategory.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WeaponcategoryService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createWeaponcategoryDto: CreateWeaponcategoryDto) {
    const result = await this.prisma.weaponcategory.create({
      data: createWeaponcategoryDto,
    });
    return result;
  }

  async bulkCreate(weaponcategories: CreateWeaponcategoryDto[]) {
    const result = await this.prisma.weaponcategory.createMany({
      data: weaponcategories,
    });
    return result;
  }

  async findAll() {
    const result = await this.prisma.weaponcategory.findMany();
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.weaponcategory.findUnique({
      where: { id },
    });
    return result;
  }

  async update(id: number, updateWeaponcategoryDto: UpdateWeaponcategoryDto) {
    const result = await this.prisma.weaponcategory.update({
      where: { id },
      data: updateWeaponcategoryDto,
    });
    return result;
  }

  async remove(id: number) {
    const result = await this.prisma.weaponcategory.delete({
      where: { id },
    });
    return result;
  }
}