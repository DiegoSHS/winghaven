import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeaponModule } from './features/weapon/weapon.module';
import { ScrapperModule } from './features/scrapper/scrapper.module';
import { CloudinaryModule } from './features/image/cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { AttachmentModule } from './features/attachment/attachment.module';
import { LoadoutModule } from './features/loadout/loadout.module';
import { LoadoutAttachmentModule } from './features/loadout-attachment/loadout-attachment.module';
import { AttachmentCategoryModule } from './features/attachment-category/attachment-category.module';
import { WeaponAttachmentModule } from './features/weapon-attachment/weapon-attachment.module';
import { WeaponCategoryModule } from './features/weapon-category/weapon-category.module';
import { PrismaModule } from './prisma.module';
import { GameModule } from './features/game/game.module';
import { ImageModule } from './features/image/image.module';

@Module({
  imports: [ConfigModule.forRoot(), WeaponModule, ScrapperModule, CloudinaryModule, AttachmentModule, LoadoutModule, LoadoutAttachmentModule, AttachmentCategoryModule, WeaponAttachmentModule, WeaponCategoryModule, PrismaModule, GameModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
