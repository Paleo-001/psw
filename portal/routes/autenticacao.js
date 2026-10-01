const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

router.get('/login', (req,res) => {
    res.render('login', {
        titulo: 'Acesso Restrito',
        erro: null
    })
});

router.post('/login', async (req,res,next) => {
    try{
        const {nome, senha } = req.body;
        const usuario = await Usuario.findOne({ nome });

        if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
            return res.render('login', {
                titulo: 'Acesso Restrito',
                erro: 'Credenciais Inválidas ou Usuário Inexistente'
            });
        }

        const token = jwt.sign({ id: usuario_id }, process.env.JWT_SECRET, { expiresIn: '2h'});

        res.cookie('token', { httpOnly: true });
        res.redirect('/');
    } catch (erro){
        next(erro);
    }
});

router.get('/logout', (res,req) => {
    res.clearCookie('token');
    res.redirect('/');
});