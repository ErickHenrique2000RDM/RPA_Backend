const router = require('express').Router()
const rpa = require('../rpa')

router.get('/', (req, res) => {
    res.status(200).send({ message: "Tudo Ok"});
})

router.get('/:name', async (req, res) => {
    console.log('recebi requisição ' + req.params.name)
    rpa.pesquisa(res, req.params.name);
})

module.exports = router