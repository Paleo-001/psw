const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/login', (req,res) => {
    res.render('login', {
        titulo: 'Acesso Restrito',
        erro: null
    })
});

router.post('/login', async (req,res,next) => {
    try{
        const {nome, senha } = req.body;
        const urlAuth = `${process.env.AUTH_SERVICE_URL}/login`;

        const resposta = await axios.post(urlAuth, {nome, senha});
        const { token } = resposta.data;

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/admin');
    } catch (erro){
        if(erro.response && erro.response.status === 491){
            return res.render('login', {
                titulo: 'Acesso Restrito',
                erro: 'Credenciais Inválidas'
            });
        }
        console.error('Erro na chamada ao microsserviço de autenticação: ', erro.message);
        return res.render('login',{
            titulo: 'Acesso Restrito',
            erro: 'Serviço de autenticação temporariamente indisponível.'
        });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;