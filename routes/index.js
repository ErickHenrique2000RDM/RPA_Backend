const router = require('express').Router()
const rpa = require('../rpa')

router.get('/:name', async (req, res) => {
    rpa.pesquisa(res, req.params.name);
})

module.exports = router