import { Injectable } from '@nestjs/common';
import { CreateAttachmentcategoryDto } from './dto/create-attachmentcategory.dto';
import { UpdateAttachmentcategoryDto } from './dto/update-attachmentcategory.dto';

@Injectable()
export class AttachmentcategoryService {
  create(createAttachmentcategoryDto: CreateAttachmentcategoryDto) {
    return 'This action adds a new attachmentcategory';
  }

  findAll() {
    return `This action returns all attachmentcategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attachmentcategory`;
  }

  update(id: number, updateAttachmentcategoryDto: UpdateAttachmentcategoryDto) {
    return `This action updates a #${id} attachmentcategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} attachmentcategory`;
  }
}
