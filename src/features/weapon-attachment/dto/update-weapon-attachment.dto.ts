import { PartialType } from '@nestjs/mapped-types';
import { CreateWeaponAttachmentDto } from './create-weapon-attachment.dto';

export class UpdateWeaponAttachmentDto extends PartialType(CreateWeaponAttachmentDto) {}
