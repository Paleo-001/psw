// Declarar Constantes
const express = require('express');
const ejs = require('hjs');
const app = express();
const porta = 3000;
// Configurar EJS
app.set('view engine','hjs');
app.set('views','./views');
// Renderizar páginas
app.get('/', (req,res) => {
    res.render('index', {
        titulo: 'Página Inicial com HJS!',
        texto: 'Bemvindo ao meu app!'
    });
});
// Escutar na porta definida
app.listen(porta, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${porta}`);
});
