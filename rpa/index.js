const kabum = require('./kabum')
const pichau = require('./pichau')
const terabyte = require('./terabyte')
const imprimir = require('./imprime')
const puppeteer = require('puppeteer');

const pesquisa = async (res, nome) => {
    const browser = await puppeteer.launch({ 
        headless: false,
        userDataDir: './cache'
        // args: [
        //     '--window-size=200,200',
        // ]
     });
    try{
        const page = await browser.newPage();
        // await page.setViewport({
        //     width: 200,
        //     height: 200, 
        // })
        await page.setDefaultNavigationTimeout(0);
        const listaKabum = await kabum.pesquisa(page, nome);
        console.log("Kabum finalizado");
        await page.waitForTimeout(2000);
        const listaPichau = await pichau.pesquisa(page, nome);
        console.log("Pichau finalizado");
        await page.waitForTimeout(1000);
        const listaTerabyte = await terabyte.pesquisa(page, nome);
        console.log("Terabyte finalizado");
        await page.waitForTimeout(1000);
        const listas = [listaKabum, listaPichau, listaTerabyte]
        //await imprimir(page, listas)
        console.log("Fim");
        browser.close();
        res.status(200).send(JSON.stringify({listas}));
    }catch(err){
        //browser.close();
        res.status(500).send(JSON.stringify({erro: err.message}))
    }
    
}

module.exports = {pesquisa}