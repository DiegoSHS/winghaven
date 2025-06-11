import { PartialType } from '@nestjs/mapped-types';
import { CreateWeaponattachmentDto } from './create-weaponattachment.dto';

export class UpdateWeaponattachmentDto extends PartialType(CreateWeaponattachmentDto) {}
