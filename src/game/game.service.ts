import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createGameDto: CreateGameDto) {
    const result = await this.prisma.game.create({
      data: createGameDto,
    });
    return result;
  }

  async bulkCreate(games: CreateGameDto[]) {
    const result = await this.prisma.game.createMany({
      data: games,
    });
    return result;
  }

  async findAll() {
    const result = await this.prisma.game.findMany();
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.game.findUnique({
      where: { id },
    });
    return result;
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const result = await this.prisma.game.update({
      where: { id },
      data: updateGameDto,
    });
    return result;
  }

  async remove(id: number) {
    const result = await this.prisma.game.delete({
      where: { id },
    });
    return result;
  }
}
