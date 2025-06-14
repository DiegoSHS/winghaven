import { Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import puppeteer from "puppeteer";
import { AttachmentCategoryService } from "src/features/attachment-category/attachment-category.service";
import { AttachmentService } from "src/features/attachment/attachment.service";
import { GameService } from "src/features/game/game.service";
import { WeaponCategoryService } from "src/features/weapon-category/weapon-category.service";
import { WeaponService } from "src/features/weapon/weapon.service";

function cleanUndefined<T>(value: T): boolean {
    return value !== undefined
}

function turnIntoProperty<T>(value: T) {
    return {
        name: value
    }
}

function LowerIncludes(text: string, phrase: string): boolean {
    return text.toLowerCase().includes(phrase.toLowerCase());
}

function IncludesAnyText(text: string, phrases: string[]): boolean {
    return phrases.some(phrase => LowerIncludes(text, phrase));
}

@Injectable()
export class PuppeteerService {
    constructor(
        private readonly weaponService: WeaponService,
        private readonly gameService: GameService,
        private readonly weaponCategoryService: WeaponCategoryService,
        private readonly attachmentService: AttachmentService,
        private readonly attachmentCategoryService: AttachmentCategoryService
    ) { }
    generateFileName(url: string): string {
        return url
            .replace('https://', '')
            .replace('http://', '')
            .replace(/[^a-zA-Z0-9+]/g, '_')
            .trim()
    }
    onEvaluate() {

        function getElementQS(element: Element | Document, selector: string): Element[] {
            try {
                return Array.from(element.querySelectorAll(selector));
            } catch (error) {
                return [];
            }
        }

        function getElementsText(elements: Element[]): string[] {
            try {
                if (!elements || elements.length === 0) {
                    return [];
                }
                return elements.map(element => element.textContent.trim());
            } catch (error) {
                return [];
            }
        }

        const tables = getElementQS(document, '.nowraplinks.mw-collapsible.mw-made-collapsible')
        const data = tables.map((table) => {
            const category = table
                .querySelector('.navbox-mobile-title')
                .textContent
            const data = getElementQS(table, 'tr')
                .map(row => {
                    const data = getElementQS(row, '.navbox-list.navbox-odd')
                        .map(cat => {
                            return getElementsText(getElementQS(cat, 'a'))
                        }).flat()
                    const subCategory = getElementsText(getElementQS(row, '.navbox-group')).join('')
                    const organizedCategory = Array.from(row.querySelectorAll('u > i')).map(el => {
                        const categoryName = el.textContent.replace(':', '').trim();
                        const u = el.parentElement;
                        const links = [];
                        let node = u.nextSibling;
                        while (node) {
                            if (node.nodeType === 1 && node.nodeName === 'A') {
                                links.push(node.textContent.trim());
                            }
                            if (node.nodeType === 1 && node.nodeName === 'U') break; // Siguiente categoría
                            node = node.nextSibling;
                        }
                        return { categoryName, data: links };
                    })
                    return {
                        organizedCategory,
                        subCategory,
                        data
                    }
                })
                .filter(row => row.data.length > 0)
            return {
                category,
                data
            }
        })
        return data
    }
    async scrap(url: string) {
        try {
            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            })
            const page = await browser.newPage()
            await page.goto(url, {
                waitUntil: 'load'
            })
            console.log('Accediendo a:', page.url())
            const scrappedData = await page.evaluate(this.onEvaluate)
            console.log('Datos obtenidos')
            console.log('Limpiando datos')
            const cleanedData = scrappedData.map((scrapped) => {
                if (scrapped.category.toLowerCase().includes('weapons')) {
                    return {
                        game: scrapped.category
                            .replace('Weapons of', '')
                            .replace('Weapons in', '')
                            .trim(),
                        weaponCategories: scrapped.data.map((d) => {
                            if (IncludesAnyText(d.subCategory, ['tacticals', 'attachments', 'wonder weapons', 'manufacturers'])) {
                                return
                            }
                            return {
                                name: d.subCategory,
                            }
                        }).filter(cleanUndefined),
                        weapons: scrapped.data.map((d) => {
                            if (IncludesAnyText(d.subCategory, ['tacticals', 'attachments', 'wonder weapons', 'manufacturers'])) {
                                return
                            }
                            return {
                                weaponCategory: d.subCategory,
                                weapons: d.data.map(turnIntoProperty).filter(cleanUndefined)
                            }
                        }).filter(cleanUndefined),
                        attachments: scrapped.data.map((d) => {
                            if (d.subCategory.toLowerCase().includes('attachments')) {
                                return d.organizedCategory
                            }
                        }).filter(cleanUndefined).flat()
                    }
                }
            }).filter(cleanUndefined)
            console.log('Saving data to files...')
            const filename = this.generateFileName(url)
            await writeFile(`${filename}.json`, JSON.stringify(scrappedData, null, 2))
            await writeFile(`${filename}.cleaned.json`, JSON.stringify(cleanedData, null, 2))
            console.log('Data saved successfully')
            await browser.close()
            const gameTitles = cleanedData.map((item) => {
                return {
                    name: item.game,
                }
            })
            const weaponCategories = cleanedData.map((item) => {
                return item.weaponCategories.map(turnIntoProperty)
            }).flat()
            const mappedCategories = new Set(weaponCategories.map(cat => cat.name));
            const uniqueCategories = Array.from(mappedCategories)
            const gameCreate = gameTitles.map((item) => {
                return item
            })
            const gameResults = await this.gameService.bulkCreate(gameCreate)
            console.log('Games created:', gameResults.count)
            const weaponCategoryResults = await this.weaponCategoryService.bulkCreate(uniqueCategories)
            console.log('Weapon categories created:', weaponCategoryResults.count)
            const attachmentCategoriesCreate = cleanedData.map((data) => {
                return data.attachments.map((att) => ({ name: att.categoryName })).filter(cleanUndefined)
            }).flat()
            const attachmentCategoriesResult = await this.attachmentCategoryService.bulkCreate(attachmentCategoriesCreate)
            console.log('Attachment categories created:', attachmentCategoriesResult.count)
            const games = await this.gameService.findAll()
            const categories = await this.weaponCategoryService.findAll()
            const attachmentCategories = await this.attachmentCategoryService.findAll()
            const weaponCreate = cleanedData.map((item) => {
                const { id: gameId } = games.find(game => game.name === item.game)
                return item.weapons.map(({ weapons, weaponCategory }) => {
                    const { id: weaponCategoryId } = categories.find(cat => cat.name === weaponCategory)
                    return weapons.map(({ name }) => {
                        return {
                            name,
                            weaponCategoryId,
                            gameId
                        }
                    })
                })
            }).flat(3)
            const weaponResults = await this.weaponService.bulkCreate(weaponCreate)
            console.log('Weapons created:', weaponResults.count)
            const attachmentCreate = cleanedData.map((item) => {
                return item.attachments.map((attachment) => {
                    const { id } = games.find(game => game.name === item.game)
                    const { id: attachmentCategoryId } = attachmentCategories.find(cat => cat.name === attachment.categoryName)
                    return attachment.data.map((att) => {
                        return {
                            name: att,
                            gameId: id,
                            attachmentCategoryId
                        }
                    })
                })
            }).flat(2)
            const attachmentResults = await this.attachmentService.bulkCreate(attachmentCreate)
            console.log('Attachments created:', attachmentResults.count)
            return {
                insertedData: {
                    games: gameResults,
                    weaponCategories: weaponCategoryResults,
                    weapons: weaponResults,
                    attachments: attachmentResults
                }
            }
        } catch (error) {
            console.error('Error during scraping:', error);
            throw error
        }
    }
}