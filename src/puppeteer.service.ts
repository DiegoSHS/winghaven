import { Injectable } from "@nestjs/common";
import { writeFile } from "fs";
import { readFile } from "fs/promises";
import puppeteer from "puppeteer";

const onEvaluate = () => {
    const getElementQS = (element: Element | Document, selector: string): Element[] => {
        return Array.from(element.querySelectorAll(selector))
    }
    const getElementsText = (elements: Element[]): string[] => {
        return elements.map(element => element.textContent.trim())
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

async function scrapp(url: string) {
    const browser = await puppeteer.launch({
        headless: true,
        waitForInitialPage: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'load'
    })
    console.log('Accediendo a:', page.url())
    const scrappedData = await page.evaluate(onEvaluate)
    console.log('Datos obtenidos')
    console.log('Limpiando datos')
    const cleanedData = scrappedData.map((sc) => {
        if (sc.category.toLowerCase().includes('weapons')) {
            return {
                game: sc.category
                    .replace('Weapons of', '')
                    .replace('Weapons in', '')
                    .trim(),
                weaponCategories: sc.data.map((d) => {
                    if (d.subCategory.toLowerCase().includes('tacticals') ||
                        d.subCategory.toLowerCase().includes('attachments') ||
                        d.subCategory.toLowerCase().includes('wonder weapons') ||
                        d.subCategory.toLowerCase().includes('manufacturers')) {
                        return
                    }
                    return {
                        name: d.subCategory,
                    }
                }).filter((d) => d !== undefined),
                weapons: sc.data.map((d) => {
                    if (d.subCategory.toLowerCase().includes('tacticals') ||
                        d.subCategory.toLowerCase().includes('attachments') ||
                        d.subCategory.toLowerCase().includes('wonder weapons') ||
                        d.subCategory.toLowerCase().includes('manufacturers')) {
                        return
                    }
                    return {
                        weaponCategory: d.subCategory,
                        weapons: d.data.map((weapon) => {
                            return {
                                name: weapon,
                            }
                        }).filter((d) => d !== undefined)
                    }
                }).filter((d) => d !== undefined),
                attachments: sc.data.map((d) => {
                    if (d.subCategory.toLowerCase().includes('attachments')) {
                        return d.data.map((attachment) => {
                            return {
                                name: attachment,
                            }
                        }).filter((d) => d !== undefined)
                    }
                }).filter((d) => d !== undefined).flat()
            }
        }
    }).filter((d) => d !== undefined)
    console.log('Cleaned data:', cleanedData)
    console.log('Saving data to files...')

    const filename = url.replace('https://', '').replace('http://', '').replace(/[^a-zA-Z0-9+]/g, '_')
    writeFile(`${filename}.json`, JSON.stringify(scrappedData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        }
    })
    writeFile(`${filename}.cleaned.json`, JSON.stringify(cleanedData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        }
    })
    console.log('Data saved successfully')
    await browser.close()
}


@Injectable()
export class PuppeteerService {
    async scrap(url: string): Promise<any> {
        return scrapp(url);
    }
    async clean(filename: string) {
        const data = await readFile(filename, {
            encoding: 'utf-8'
        })
        const jsonData = JSON.parse(data);
        const gameTitles = jsonData.map((item) => {
            return {
                name: item.game
            }
        })
        const weaponCategories = jsonData.map((item) => {
            return item.weaponCategories.map((cat) => {
                return {
                    name: cat.name
                }
            })
        }).flat()
        const mappedCategories = new Set(weaponCategories.map(cat => cat.name));
        const uniqueCategories = Array.from(mappedCategories, (cat) => {
            return {
                name: cat
            }
        })
        return {
            uniqueCategories,
            gameTitles,
        }
    }
}