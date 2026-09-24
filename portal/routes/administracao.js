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
        acao: 'salvar'
    });
});

router.post('/salvar', async (req,res,next) => {
    try {
        const { titulo, resumo, conteudo, imagem, destaque } = req.body;
        await Artigo.create({
            titulo,
            resumo,
            conteudo,
            imagem,
            destaque: destaque === 'on'
        });
        res.redirect('/admin');
    } catch (erro) {
        next(erro);
    }
});

router.post('/excluir/:id', async (req,res,next) => {
    try {
        await Artigo.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (erro) {
        next(erro);
    }
});

router.get('/editar/:id', async (req,res,next) => {
    try {
        const artigo = await Artigo.findById(req.params.id);
        if (!artigo) return res.status(404).send('Artigo não encontrado');
        res.render('admin/form', {
            titulo: 'Editar artigo',
            artigo,
            acao: `/admin/editar/${artigo._id}`
        });
    } catch (error) {
        next(error);
    }
});

router.post('/editar/:id', async (req,res,next) => {
    try{
        const {titulo,resumo,conteudo,imagem,destaque}=req.body;
        await Artigo.findByIdAndUpdate(req.params.id,{
            titulo,
            resumo,
            conteudo,
            imagem,
            destaque: destaque === 'on'
        });
        res.redirect('/admin');
    } catch (erro){
        next(erro);
    }
});

module.exports = router;