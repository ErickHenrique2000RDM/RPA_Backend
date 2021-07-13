const puppeteer = require('puppeteer');

const pesquisa = async (page, pesquisar) => {
    await page.goto(`https://www.kabum.com.br/cgi-local/site/listagem/listagem.cgi?string=${pesquisar}&btnG=&pagina=1&ordem=3&limite=30&prime=false&marcas=[]&tipo_produto=[]&filtro=[]`, {waitUntil: 'networkidle2'});
    //await page.waitForTimeout(1000);

    const lista = await page.evaluate((pesquisar) => {
        var nodeList = document.querySelectorAll('div.sc-fzqNqU.jmuOAh');
        console.log(nodeList)
        if(!nodeList){
            nodeList = document.querySelectorAll('div.sc-fzqARJ.eITELq');
        }
        const array = [...nodeList];

        const listPrecos = array.map((item) => {
            const preco = item.childNodes[1].innerText.toLowerCase();
            
                return {
                    nome: item.childNodes[1].innerText,
                    link: item.childNodes[0].href,
                    preco: item.childNodes[2].childNodes[0].childNodes[3].innerText.toLowerCase() === 'no boleto' ? item.childNodes[2].childNodes[0].childNodes[2].innerText : item.childNodes[2].childNodes[0].childNodes[3].innerText
                }
            
            
        }, pesquisar).filter(item => item !== null)

        console.log(listPrecos)
        return listPrecos
    }, pesquisar)

    //await browser.close();
    page.on('load', () => {
        //console.log('ola')
        return lista;
    })

    return lista;
}

module.exports = {pesquisa}