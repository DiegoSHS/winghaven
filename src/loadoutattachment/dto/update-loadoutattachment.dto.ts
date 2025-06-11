import { PartialType } from '@nestjs/mapped-types';
import { CreateLoadoutattachmentDto } from './create-loadoutattachment.dto';

export class UpdateLoadoutattachmentDto extends PartialType(CreateLoadoutattachmentDto) {}
