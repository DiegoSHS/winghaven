import { Injectable } from '@nestjs/common';
import { CreateLoadoutDto } from './dto/create-loadout.dto';
import { UpdateLoadoutDto } from './dto/update-loadout.dto';

@Injectable()
export class LoadoutService {
  create(createLoadoutDto: CreateLoadoutDto) {
    return 'This action adds a new loadout';
  }

  findAll() {
    return `This action returns all loadout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loadout`;
  }

  update(id: number, updateLoadoutDto: UpdateLoadoutDto) {
    return `This action updates a #${id} loadout`;
  }

  remove(id: number) {
    return `This action removes a #${id} loadout`;
  }
}
