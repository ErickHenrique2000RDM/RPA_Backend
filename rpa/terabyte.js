const puppeteer = require('puppeteer');

const pesquisa = async (page, pesquisar) => {
    await page.goto(`https://www.terabyteshop.com.br/busca?str=${pesquisar}`, {waitUntil: 'networkidle2'});   

    const lista = await page.evaluate((pesquisar) => {
        var nodeList = document.querySelectorAll('div.pbox.col-xs-12.col-sm-6.col-md-3');

        const array = [...nodeList];
        const listPrecos = array.map((item) => {
            try{
                var preco
                try{
                    preco = item.childNodes[1].childNodes[7].childNodes[1].childNodes[5].childNodes[0].innerText
                }catch(e){
                    preco = 'indisponivel';
                }
                return {
                    nome: item.childNodes[1].childNodes[1].childNodes[1].childNodes[1].alt,
                    link: item.childNodes[1].childNodes[1].childNodes[1].href,
                    preco: preco
                }
            }catch(e){
                return null
            }
        }, pesquisar).filter(item => {return(item !== null || item.nome !== "")})

        listPrecos.sort(function (a, b) {
            if (Number(a.preco.slice(2).replace('.', '').replace(',', '.')) > Number(b.preco.slice(2).replace('.', '').replace(',', '.'))) {
              return 1;
            }
            if (Number(a.preco.slice(2).replace('.', '').replace(',', '.')) < Number(b.preco.slice(2).replace('.', '').replace(',', '.'))) {
              return -1;
            }
            return 0;
        });

        return listPrecos
    }, pesquisar)

    return lista;
}

module.exports = {pesquisa}