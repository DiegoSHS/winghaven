import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { customIdPipe } from 'src/common/validation';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) { }

  @Post()
  create(@Body() createGameDto: CreateGameDto | CreateGameDto[]) {
    if (Array.isArray(createGameDto)) return this.gameService.bulkCreate(createGameDto);
    return this.gameService.create(createGameDto);
  }

  @Get()
  findAll(
    @Param('id', customIdPipe) id?: number
  ) {
    if (id) {
      return this.gameService.findOne(id);
    }
    return this.gameService.findAll();
  }

  @Patch(':id')
  update(@Param('id', customIdPipe) id: number, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id', customIdPipe) id: number) {
    return this.gameService.remove(id);
  }
}
