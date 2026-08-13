const express = require('express');
const app = express();
const port = 3000;

app.use((req,res,next) => {
    console.log("Middleware");
    next();
});

app.use((req,res,next) => {
    console.log("Middleware 2");
    next();
});

app.get('/', (req, res) => {
    res.send('Rota Principal');
});

app.get('/2', (req,res) => {
    res.send('Página 2');
});

app.get('/3', (req,res) => {
    res.send('Página 3');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


