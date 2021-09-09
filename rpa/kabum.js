const puppeteer = require('puppeteer');

const pesquisa = async (page, pesquisar) => {
    //await page.goto(`https://www.kabum.com.br/cgi-local/site/listagem/listagem.cgi?string=${pesquisar}&btnG=&pagina=1&ordem=3&limite=30&prime=false&marcas=[]&tipo_produto=[]&filtro=[]`, {waitUntil: 'networkidle2'});

    await page.goto(`https://www.kabum.com.br/busca?query=${pesquisar}`, {waitUntil: 'networkidle2'});

    const button = await page.$('.sc-dUjcNx.haCjLX');
    await button.click();
    await page.waitForTimeout(1000);
    // const preco = await page.$('option');
    //const preco = button.firstElementChild;
    const preco = button.firstChild;
    await preco.click();
    console.log('ola')

    // const lista = await page.evaluate((pesquisar) => {
    //     var nodeList = document.querySelectorAll('div.sc-fzqNqU.jmuOAh');
    //     if(!nodeList){
    //         nodeList = document.querySelectorAll('div.sc-fzqARJ.eITELq');
    //     }
    //     const array = [...nodeList];

    //     const listPrecos = array.map((item) => {
    //             return {
    //                 nome: item.childNodes[1].innerText,
    //                 link: item.childNodes[0].href,
    //                 preco: item.childNodes[2].childNodes[0].childNodes[3].innerText.toLowerCase() === 'no boleto' ? item.childNodes[2].childNodes[0].childNodes[2].innerText : item.childNodes[2].childNodes[0].childNodes[3].innerText
    //             }
            
            
    //     }, pesquisar).filter(item => item !== null)

    //     return listPrecos
    // }, pesquisar)

    // return lista;
}

module.exports = {pesquisa}