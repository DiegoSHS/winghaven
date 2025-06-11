import { PartialType } from '@nestjs/mapped-types';
import { CreateAttachmentcategoryDto } from './create-attachmentcategory.dto';

export class UpdateAttachmentcategoryDto extends PartialType(CreateAttachmentcategoryDto) {}
