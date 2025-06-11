import { PartialType } from '@nestjs/mapped-types';
import { CreateAttachmentCategoryDto } from './create-attachment-category.dto';

export class UpdateAttachmentCategoryDto extends PartialType(CreateAttachmentCategoryDto) {}
