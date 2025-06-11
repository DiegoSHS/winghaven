import { Injectable } from '@nestjs/common';
import { CreateWeaponcategoryDto } from './dto/create-weaponcategory.dto';
import { UpdateWeaponcategoryDto } from './dto/update-weaponcategory.dto';

@Injectable()
export class WeaponcategoryService {
  create(createWeaponcategoryDto: CreateWeaponcategoryDto) {
    return 'This action adds a new weaponcategory';
  }

  findAll() {
    return `This action returns all weaponcategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weaponcategory`;
  }

  update(id: number, updateWeaponcategoryDto: UpdateWeaponcategoryDto) {
    return `This action updates a #${id} weaponcategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} weaponcategory`;
  }
}
