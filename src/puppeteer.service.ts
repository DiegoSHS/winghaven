import { Injectable } from "@nestjs/common";
import { writeFile } from "fs";
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
    const filename = url.replace('https://', '').replace('http://', '').replace(/[^a-zA-Z0-9+]/g, '_')
    writeFile(`${filename}.json`, JSON.stringify(scrappedData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        }
    })
    await browser.close()
}

@Injectable()
export class PuppeteerService {
    async scrap(url: string): Promise<any> {
        return scrapp(url);
    }
}