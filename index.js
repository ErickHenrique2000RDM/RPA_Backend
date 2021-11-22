const express = require('express');
const router = require('./routes')
const api = express();
const allowCors = require('./routes/cors')
const config = require('dotenv/config');

config();

const port = 8000;

api.use(allowCors)

api.use(express.json())

api.use(function (req, res, next) {
    res.contentType('application/json');
    next();
});

api.use(router)

api.listen(process.env.PORT || 8000, ()=> {
    console.log(`Api está rodando na porta ${process.env.PORT || 8000}`)
})