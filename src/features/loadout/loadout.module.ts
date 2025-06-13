import { Module } from '@nestjs/common';
import { LoadoutService } from './loadout.service';
import { LoadoutController } from './loadout.controller';

@Module({
  controllers: [LoadoutController],
  providers: [LoadoutService],
})
export class LoadoutModule {}
