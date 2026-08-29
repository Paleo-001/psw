const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('./modelo/esquema');
const app = express();

app.set('view engine','ejs');
app.set('views','./frontend');

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/EmpresasBR')
    .then(() => console.log('Conectado ao MongoDB com sucesso!'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB: ',err));

app.get('/cadastro', (req,res) => {
    res.render('index');
});
app.post('/salvar', async (req,res) => {
    try{
        // const nome = req.body.nome;
        const { nome, idade, email } = req.body;
        const novoUsuario = new Usuario({ nome, idade, email});
        await novoUsuario.save();
        res.send('Usuário salvo com sucesso!');
    } catch(err) {
        console.error('Erro ao salvar usuário', err);
        res.status(500).send('Erro ao salvar usuário');
    }
});

app.get('/', async (req,res) => {
    try {
        const usuarios = await Usuario.find({});
        res.render('inicial', { usuarios });
    } catch (error) {
        console.error('Erro ao listar usuários:',error);
        res.status(500).send('Erro ao buscar usuários.');
    }
});

app.get('/excluir/:id', async (req,res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado!');
        }
    } catch (error) {
        
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em: http://localhost:3000');
});