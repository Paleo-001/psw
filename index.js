const http = require('http');
const digaOla = require('./bemvindo');
const funcaoMatematica =  require('./calculos');

const porta = 3000;
const endereco = '127.0.0.1'; //0.0.0.0 se rede estiver como bridge
const servidor = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain; charset=utf-8');
    res.end(digaOla('FTEC'));
});

servidor.listen(porta,endereco, () => {
    console.log(`Servidor rodando em http://${endereco}:${porta}`);
    console.log("Resultado da subtração: ", funcaoMatematica.subtraia(7,2));
    // console.log("Resultado da DIvisão: ", funcaoMatematica.divida(6,0));
    console.log("Resultado da Divisão 2: ", funcaoMatematica.divida(9,3));
});