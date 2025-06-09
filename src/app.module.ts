import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeaponModule } from './weapon/weapon.module';
import { ScrapperModule } from './scrapper/scrapper.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [WeaponModule, ScrapperModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
