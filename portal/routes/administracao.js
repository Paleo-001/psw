const express = require('express');
const router = express.Router();
const Artigo = require('../models/artigo');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

router.get('/', async (req,res,next) => {
    const usuario = req.usuario.nome;
    const capitalizar = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    const user = capitalizar(usuario);
    const saudacao = `- Olá ${user}!`;
    try {
        const artigos = await Artigo.find({}).sort({ criadoEm: -1});
        res.render('admin/index',{
            titulo: 'Painel Administrativo Blog',
            saudacao,
            artigos
        });
    } catch (erro) {
        next(erro);
    }
});

router.get('/novoArtigo', (req,res) => {
    res.render('admin/form', {
        titulo: 'Novo artigo',
        artigo: {},
        acao: 'salvar'
    });
});

router.post('/salvarArtigo', async (req,res,next) => {
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

router.post('/excluirArtigo/:id', async (req,res,next) => {
    try {
        await Artigo.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (erro) {
        next(erro);
    }
});

router.get('/editarArtigo/:id', async (req,res,next) => {
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

router.post('/editarArtigo/:id', async (req,res,next) => {
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

router.get('/registrarAdmin', (req,res) => {
    res.render('admin/criar-admin', {
        titulo: 'Criar novo administrador',
        erro: null
    })
});

router.post('/registrarAdmin', async (req,res,next) => {
    try {
        const { nome, senha } = req.body;
        const usuarioExistente = await Usuario.findOne({ nome });
        if (usuarioExistente) {
            return res.render('admin/criar-admin', {
              titulo: 'Criar novo administrador',
              erro: 'Este nome de usuário já está em uso.'  
            });
        }
        const senhaCriptografada = bcrypt.hashSync(senha,10);

        await Usuario.create({
            nome,
            senha: senhaCriptografada
        });
        res.redirect('/login');
    } catch (erro) {
        next(erro);
        
    }
});

module.exports = router;