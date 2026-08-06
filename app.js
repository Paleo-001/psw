const http = require('http');
const porta = 3000;
const endereco = '127.0.0.1';
const servidor = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain; charset=utf-8');
    res.end('Olá pessoal da FTEC!\n');
});

servidor.listen(porta,endereco, () => {
    console.log(`Servidor rodando em http://${endereco}:${porta}`);
});