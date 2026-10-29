require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('./modelos/Usuario');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Microsserviço de autenticação conectado ao mongoDB'))
    .catch((erro) => console.error('Erro na conexão com o mongoDB: ', erro));

app.post('/login', async (req,res) => {
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

        return res.status(200).json({ token, usuario: {nome: usuario.nome}});
    } catch (erro){
        console.error('Erro no processamento de login: ', erro);
        return res.status(500).json({ mensagem: 'Erro interno no serviço de autenticação'});
    }
});

const PORTA = process.env.PORTA;
app.listen(PORTA, () => {
    console.log(`Microsserviço de autenticação rodando na porta ${PORTA}`);
});