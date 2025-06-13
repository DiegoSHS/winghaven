import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";
import puppeteer from "puppeteer";
import { PrismaService } from "src/prisma.service";

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
        private readonly prisma: PrismaService
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
                    return {
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
                                return d.data.map(turnIntoProperty).filter(cleanUndefined)
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
                return this.prisma.game.create({
                    data: item
                })
            })
            const gameResults = await Promise.all(gameCreate)
            console.log('Games created:', gameResults.some(game => game.id))
            const weaponCategoryCreate = uniqueCategories.map((category) => {
                return this.prisma.weaponCategory.create({
                    data: category
                })
            })
            const weaponCategoryResults = await Promise.all(weaponCategoryCreate)
            console.log('Weapon categories created:', weaponCategoryResults.some(cat => cat.id))
            const weaponCreate = cleanedData.map((item) => {
                return item.weapons.map((item) => {
                    return item.weapons.map((weapon) => {
                        return {
                            name: weapon.name,
                            weaponCategoryId: weaponCategoryResults.find(cat => cat.name === item.weaponCategory).id,
                        }
                    })
                })
            }).flat(3)
            const weaponResults = await this.prisma.weapon.createMany({
                data: weaponCreate,
                skipDuplicates: true
            })
            console.log('Weapons created:', weaponResults.count)
            const attachmentCreate = cleanedData.map((item) => {
                return item.attachments.map((attachment) => {
                    return {
                        name: attachment.name,
                        gameId: gameResults.find(game => game.name === item.game).id,
                    }
                })
            }).flat(2)
            const attachmentResults = await this.prisma.attachment.createMany({
                data: attachmentCreate,
                skipDuplicates: true
            })
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