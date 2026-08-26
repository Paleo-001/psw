// Declarando constantes
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongo = require('mongoose');
const porta = 3000;
// Conectando ao Banco de Dados
mongo.connect('mongodb://localhost:27017/db')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB',err));
// Criando modelo do banco
const User = mongo.model('Usuario', new mongo.Schema({
    nome: String,
    idade: Number,
    email: String
}));
// Definindo o motor de páginas
app.set('view engine','ejs');
app.set('views','./frontend');
// Criando as rotas
app.get('/', async (req,res) => {
    const mongoUsers = await User.find({});
    res.render('index', {
        titulo: 'Usuários atuais',
        usuarios: mongoUsers 
    })
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost${porta}`);
});