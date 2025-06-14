import { Module } from '@nestjs/common';
import { AttachmentCategoryModule } from 'src/features/attachment-category/attachment-category.module';
import { AttachmentCategoryService } from 'src/features/attachment-category/attachment-category.service';
import { AttachmentModule } from 'src/features/attachment/attachment.module';
import { AttachmentService } from 'src/features/attachment/attachment.service';
import { GameModule } from 'src/features/game/game.module';
import { GameService } from 'src/features/game/game.service';
import { PuppeteerService } from 'src/features/scrapper/puppeteer/puppeteer.service';
import { WeaponCategoryModule } from 'src/features/weapon-category/weapon-category.module';
import { WeaponCategoryService } from 'src/features/weapon-category/weapon-category.service';
import { WeaponModule } from 'src/features/weapon/weapon.module';
import { WeaponService } from 'src/features/weapon/weapon.service';

@Module({
    imports: [WeaponModule, AttachmentModule, WeaponCategoryModule, GameModule, AttachmentCategoryModule],
    providers: [PuppeteerService, WeaponService, AttachmentService, WeaponCategoryService, GameService, AttachmentCategoryService],
    exports: [PuppeteerService],
})
export class PuppeteerModule { }
