const puppeteer = require('puppeteer');

const pesquisa = async (page, pesquisar) => {
    //await page.goto(`https://www.kabum.com.br/cgi-local/site/listagem/listagem.cgi?string=${pesquisar}&btnG=&pagina=1&ordem=3&limite=30&prime=false&marcas=[]&tipo_produto=[]&filtro=[]`, {waitUntil: 'networkidle2'});

    await page.goto(`https://www.kabum.com.br/busca?query=${pesquisar}&page_number=1&page_size=20&facet_filters=&sort=price`, {waitUntil: 'networkidle2'});

    const lista = await page.evaluate((pesquisar) => {
        var nodeList = document.querySelectorAll('.sc-ipXKqB.jlZVda.productCard');
        if(!nodeList){
            nodeList = document.querySelectorAll('div.sc-fzqARJ.eITELq');
        }
        const array = [...nodeList];

        const listPrecos = array.map((item) => {
                const preco = item.querySelector('.sc-gJWqzi.fIvuMz.priceCard').innerText;
                const nome = item.querySelector('.sc-bHwgHz.hjoTtD.sc-ipZHIp.kkHpiL.nameCard').innerText;
                const link = item.querySelector('.sc-dliRfk.jbxMFH').href;
                return {
                    preco,
                    nome,
                    link
                }
            
            
        }, pesquisar).filter(item => item !== null)

        return listPrecos
    }, pesquisar)

    return lista;
}

module.exports = {pesquisa}