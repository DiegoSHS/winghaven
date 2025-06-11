import { Injectable } from '@nestjs/common';
import { CreateWeaponattachmentDto } from './dto/create-weaponattachment.dto';
import { UpdateWeaponattachmentDto } from './dto/update-weaponattachment.dto';

@Injectable()
export class WeaponattachmentService {
  create(createWeaponattachmentDto: CreateWeaponattachmentDto) {
    return 'This action adds a new weaponattachment';
  }

  findAll() {
    return `This action returns all weaponattachment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weaponattachment`;
  }

  update(id: number, updateWeaponattachmentDto: UpdateWeaponattachmentDto) {
    return `This action updates a #${id} weaponattachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} weaponattachment`;
  }
}
