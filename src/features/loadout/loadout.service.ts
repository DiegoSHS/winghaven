import { Injectable } from '@nestjs/common';
import { CreateLoadoutDto } from './dto/create-loadout.dto';
import { UpdateLoadoutDto } from './dto/update-loadout.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LoadoutService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }
  async create(createLoadoutDto: CreateLoadoutDto) {
    const result = await this.prisma.loadout.create({
      data: createLoadoutDto,
    })
    return result
  }

  async findAll() {
    const result = await this.prisma.loadout.findMany({
      include: {
        loadoutAttachment: {
          include: {
            attachment: true,
          },
        }
      },
    })
    return result;
  }

  findOne(id: number) {
    const result = this.prisma.loadout.findUnique({
      where: {
        id: id,
      },
      include: {
        loadoutAttachment: {
          include: {
            attachment: true,
          },
        }
      },
    })
    return result
  }

  update(id: number, updateLoadoutDto: UpdateLoadoutDto) {
    const result = this.prisma.loadout.update({
      where: {
        id: id,
      },
      data: updateLoadoutDto,
    })
    return result
  }
  remove(id: number) {
    const result = this.prisma.loadout.delete({
      where: {
        id: id,
      }
    })
    return result;
  }
}
