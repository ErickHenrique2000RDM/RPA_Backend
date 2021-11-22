const router = require('express').Router()
const rpa = require('../rpa')

router.get('/:name', async (req, res) => {
    console.log('recebi requisição ' + req.params.name)
    rpa.pesquisa(res, req.params.name);
})

module.exports = router