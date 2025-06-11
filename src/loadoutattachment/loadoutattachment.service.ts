import { Injectable } from '@nestjs/common';
import { CreateLoadoutattachmentDto } from './dto/create-loadoutattachment.dto';
import { UpdateLoadoutattachmentDto } from './dto/update-loadoutattachment.dto';

@Injectable()
export class LoadoutattachmentService {
  create(createLoadoutattachmentDto: CreateLoadoutattachmentDto) {
    return 'This action adds a new loadoutattachment';
  }

  findAll() {
    return `This action returns all loadoutattachment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loadoutattachment`;
  }

  update(id: number, updateLoadoutattachmentDto: UpdateLoadoutattachmentDto) {
    return `This action updates a #${id} loadoutattachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} loadoutattachment`;
  }
}
