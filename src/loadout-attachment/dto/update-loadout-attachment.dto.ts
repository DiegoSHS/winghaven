import { PartialType } from '@nestjs/mapped-types';
import { CreateLoadoutAttachmentDto } from './create-loadout-attachment.dto';

export class UpdateLoadoutAttachmentDto extends PartialType(CreateLoadoutAttachmentDto) { }
