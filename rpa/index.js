const kabum = require('./kabum')
const pichau = require('./pichau')
const terabyte = require('./terabyte')
const puppeteer = require('puppeteer');

const pesquisa = async (res, nome) => {
    const browser = await puppeteer.launch({ 
        headless: false,
        userDataDir: './cache',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
     });
    try{
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36');
        await page.setDefaultNavigationTimeout(0);
        const listaKabum = await kabum.pesquisa(page, nome);
        await page.waitForTimeout(1000);
        const listaPichau = await pichau.pesquisa(page, nome);
        await page.waitForTimeout(1000);
        const listaTerabyte = await terabyte.pesquisa(page, nome);
        await page.waitForTimeout(20000);
        const listas = [listaKabum, listaPichau, listaTerabyte]
        browser.close();
        res.status(200).send(JSON.stringify({listas}));
    }catch(err){
        browser.close();
        console.log(err.message)
        res.status(500).send(JSON.stringify({erro: err.message}))
    }
    
}

module.exports = {pesquisa}