const puppeteer = require('puppeteer');

const pesquisa = async (page, pesquisar) => {
    await page.goto(`https://www.terabyteshop.com.br/busca?str=${pesquisar}`, {waitUntil: 'networkidle2'});

    // const pageClick = async (tent) => {
    //     try{
    //         await page.click('.dropdown.pull-right')
    //         await page.click('.tb.dfilter.dordem')
    //         await page.waitForNavigation();
    //     }catch(e){
    //         if(tent > 20){
    //             throw new Error('Erro ao filtrar por preço')
    //         }
    //         pageClick(tent + 1)
    //     }
    // }

    // await pageClick(1);    

    const lista = await page.evaluate((pesquisar) => {
        const nodeList = document.querySelectorAll('div.pbox.col-xs-12.col-sm-6.col-md-3');

        const array = [...nodeList];
        console.log('oi');
        const listPrecos = array.map((item, index) => {
            try{
                console.log(index + '1')
                const nome = item.childNodes[1].childNodes[1].childNodes[1].childNodes[1].alt.toLowerCase();
                console.log(index + '2')
                console.log(`nome : ${nome}\n pesquisa: ${pesquisar}\n index: ${nome.indexOf(pesquisar)}`)
                console.log(index + '3')
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
                    //number: Number(preco.slice(2).replace('.', '').replace(',', '.'))
                }
            }catch(e){
                return null
            }
        }, pesquisar).filter(item => item !== null)

        console.log('quase')

        listPrecos.sort(function (a, b) {
            if (Number(a.preco.slice(2).replace('.', '').replace(',', '.')) > Number(b.preco.slice(2).replace('.', '').replace(',', '.'))) {
              return 1;
            }
            if (Number(a.preco.slice(2).replace('.', '').replace(',', '.')) < Number(b.preco.slice(2).replace('.', '').replace(',', '.'))) {
              return -1;
            }
            // a must be equal to b
            return 0;
        });
        console.log('fim')

        console.log(listPrecos)
        return listPrecos
    }, pesquisar)

    // //await browser.close();
    page.on('load', () => {
        //console.log('ola')
        return lista;
    })

    return lista;
}

module.exports = {pesquisa}