import { Module } from '@nestjs/common';
import { SharpService } from './sharp.service';

@Module({
  providers: [SharpService],
})
export class SharpModule { }
