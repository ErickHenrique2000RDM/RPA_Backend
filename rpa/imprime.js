const puppeteer = require('puppeteer');

module.exports = async (page, lista) => {
    await page.evaluate((lista) => {
        console.log(lista)
    }, lista)
}