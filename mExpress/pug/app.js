// Declarar Constantes
const express = require('express');
const ejs = require('pug');
const app = express();
const porta = 3000;
// Configurar EJS
app.set('view engine','pug');
app.set('views','./frontenzo');
// Renderizar páginas
app.get('/', (req,res) => {
    res.render('index', {
        titulo: 'Página Inicial com PUG',
        texto: 'Bemvindo ao meu app!'
    });
});
// Escutar na porta definida
app.listen(porta, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${porta}`);
});
