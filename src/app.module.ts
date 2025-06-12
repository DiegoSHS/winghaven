import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeaponModule } from './weapon/weapon.module';
import { ScrapperModule } from './scrapper/scrapper.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { AttachmentModule } from './attachment/attachment.module';
import { LoadoutModule } from './loadout/loadout.module';
import { LoadoutAttachmentModule } from './loadout-attachment/loadout-attachment.module';
import { AttachmentCategoryModule } from './attachment-category/attachment-category.module';
import { WeaponAttachmentModule } from './weapon-attachment/weapon-attachment.module';
import { WeaponCategoryModule } from './weapon-category/weapon-category.module';
import { PrismaModule } from './prisma.module';
import { GameModule } from './game/game.module';
import { TesseractModule } from './tesseract/tesseract.module';
import { SharpModule } from './sharp/sharp.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [ConfigModule.forRoot(), WeaponModule, ScrapperModule, CloudinaryModule, AttachmentModule, LoadoutModule, LoadoutAttachmentModule, AttachmentCategoryModule, WeaponAttachmentModule, WeaponCategoryModule, PrismaModule, GameModule, TesseractModule, SharpModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
