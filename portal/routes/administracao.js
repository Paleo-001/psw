const express = require('express');
const router = express.Router();
const Artigo = require('../models/artigo');

router.get('/', async (req,res,next) => {
    try {
        const artigos = await Artigo.find({}).sort({ criadoEm: -1});
        res.render('admin/index',{
            titulo: 'Painel Administrativo Blog',
            artigos
        });
    } catch (erro) {
        next(erro);
    }
});

router.get('/novo', (req,res) => {
    res.render('admin/form', {
        titulo: 'Novo artigo',
        artigo: {},
        acao: '/admin/salvar'
    });
});

router.post('/salvar', async (req,res,next) => {
    try {
        const { titulo, conteudo, imagem, destaque } = req.body;
        await Artigo.create({
            titulo,
            resumo,
            conteudo,
            imagem,
            destaque: destaque === 'true'
        });
        res.redirect('/admin');
    } catch (erro) {
        next(erro);
    }
});

module.exports = router;