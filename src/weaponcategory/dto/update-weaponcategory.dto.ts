import { PartialType } from '@nestjs/mapped-types';
import { CreateWeaponcategoryDto } from './create-weaponcategory.dto';

export class UpdateWeaponcategoryDto extends PartialType(CreateWeaponcategoryDto) {}
