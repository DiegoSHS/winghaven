import { Module } from '@nestjs/common';
import { LoadoutService } from './loadout.service';
import { LoadoutController } from './loadout.controller';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [ImageModule],
  controllers: [LoadoutController],
  providers: [LoadoutService],
})
export class LoadoutModule { }
