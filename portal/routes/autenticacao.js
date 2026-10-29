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

/* router.post('/login', async (req,res,next) => {
    try{
        const {nome, senha } = req.body;
        const usuario = await Usuario.findOne({ nome });

        if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
            return res.render('login', {
                titulo: 'Acesso Restrito',
                erro: 'Credenciais Inválidas ou Usuário Inexistente'
            });
        }

        const token = jwt.sign({ id: usuario._id, nome: usuario.nome }, process.env.JWT_SECRET, { expiresIn: '2h'});

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/admin');
    } catch (erro){
        next(erro);
    }
});
*/
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;