const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const artigo = require('../models/artigo');

const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml; q=0.1'
    }
});

router.get('/', async (req,res,next) => {
    try {
        const slides = await artigo.find({
            imagem: { $ne: null, $ne: '' },
            destaque: true
        }).sort({ criadoEm: -1}).limit(5);

        let noticiasRSS = [];
        try {
            const feed = await parser.parseURL('https://g1.globo.com/rss/g1/tecnologia');
            noticiasRSS = feed.items.slice(0,6);
        } catch (erroFeed) {
            console.error('Falha no RSS:',erroFeed.message);
        }

        res.render('index', {
            titulo: 'Portal Dev - Início',
            slides,
            noticiasRSS
        });
    } catch (erro) {
        next(erro);
    }
});

router.get('/sobre', (req,res) => {
    res.render('sobre', { titulo: 'Sobre mim'});
});

module.exports = router;