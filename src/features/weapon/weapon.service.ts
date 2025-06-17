import { Injectable } from '@nestjs/common';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WeaponService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async create(createWeaponDto: CreateWeaponDto) {
    const result = await this.prisma.weapon.create({
      data: createWeaponDto,
    })
    return result;
  }
  async bulkCreate(weapons: CreateWeaponDto[]) {
    const result = await this.prisma.weapon.createMany({
      data: weapons
    });
    return result;
  }
  async findAll() {
    const result = await this.prisma.weapon.findMany();
    return result;
  }


  async findOne(id: number) {
    const result = await this.prisma.weapon.findUnique({
      where: { id },
    });
    return result;
  }

  async findByName(name: string) {
    const result = await this.prisma.weapon.findFirst({
      where: {
        name: {
          contains: name.toLowerCase().trim(),
          mode: 'insensitive',
        },
      },
    });
    return result;
  }

  async filterByName(name: string) {
    const result = await this.prisma.weapon.findMany({
      where: {
        name: {
          contains: name.toLowerCase().trim(),
          mode: 'insensitive',
        },
      },
    });
    return result;
  }

  async update(id: number, updateWeaponDto: UpdateWeaponDto) {
    const result = await this.prisma.weapon.update({
      where: { id },
      data: updateWeaponDto,
    });
    return result;
  }

  async remove(id: number) {
    const result = await this.prisma.weapon.delete({
      where: { id },
    });
    return result;
  }
}
