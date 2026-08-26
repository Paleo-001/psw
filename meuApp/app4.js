const express = require('express');
const app = express();
const porta = 3000;

app.get('/erro', (req,res) => {
    throw new Error('Esse é um erro de servidor!');
});

app.get('/erro-cliente', (req,res,next) => {
    const err = new Error('Esse é um erro de cliente!');
    err.type = 'cliente';
    next(err);
});

app.use((err,req,res,next) => {
    console.log(err.stack);
    if (res.headerSent) {
        return next(err);
    }
    if (err.type === 'cliente') {
        res.status(400).send('Solicitação errada');
    } else {
        res.status(500).send('Erro Interno do Servidor');
    }
});

app.listen(3000, () => {
    console.log(`Servidor rodando na porta: ${porta}`);
});