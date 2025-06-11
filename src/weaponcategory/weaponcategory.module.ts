import { Module } from '@nestjs/common';
import { WeaponcategoryService } from './weaponcategory.service';
import { WeaponcategoryController } from './weaponcategory.controller';

@Module({
  controllers: [WeaponcategoryController],
  providers: [WeaponcategoryService],
})
export class WeaponcategoryModule {}
