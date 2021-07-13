//MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 MuiGrid-grid-lg-3 MuiGrid-grid-xl-2

const puppeteer = require('puppeteer');

const pesquisa = async (page, pesquisar) => {
    await page.goto(`https://www.pichau.com.br/search?q=${pesquisar}&sort=price-asc`, {waitUntil: 'networkidle2'});

    await page.waitForTimeout(1000);

    const lista = await page.evaluate((pesquisar) => {
        const nodeList = document.querySelectorAll('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6.MuiGrid-grid-md-4.MuiGrid-grid-lg-3.MuiGrid-grid-xl-2');

        const array = [...nodeList];
        //console.log(array)

        const listPrecos = array.map((item, index) => {
            //const preco = item.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerText.toLowerCase();
            try{
                const nome = item.querySelectorAll('.MuiTypography-root.jss62.jss63.MuiTypography-h6');
                const nomeFinal = nome[0].innerText;
                const preco = item.querySelectorAll('.jss65');
                var precoFinal;
                if(preco.length > 0){
                    precoFinal = preco[0].innerText;
                }else{
                    precoFinal = 'indisponivel';
                }

                const link = item.querySelectorAll('.jss16');
                const linkFinal = link[0].href
                
                return {
                    nome: nomeFinal,
                    link: linkFinal,
                    preco: precoFinal
                }
            }catch(e){
                try{
                    const preco = item.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerText.toLowerCase();
                    //console.log(pesquisar)
                    var nome
                    if(item.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].innerText.toLowerCase() == "à vista"){
                        nome = item.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[2].innerText
                    }else{
                        nome = item.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].innerText
                    }
                    return {
                        nome: item.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerText,
                        link: item.childNodes[0].href,
                        preco: nome
                    }
                }catch(e){
                    return null
                }
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