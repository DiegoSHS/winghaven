import { PartialType } from '@nestjs/mapped-types';
import { CreateLoadoutDto } from './create-loadout.dto';

export class UpdateLoadoutDto extends PartialType(CreateLoadoutDto) {}
