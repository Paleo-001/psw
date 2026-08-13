const http = require('http');
function dizerOla(res){
    res.statusCode = 200;
    res.setHeader = ('Content-Type','text/plain; charset=utf-8');
    res.end('Olá! A sua resposta está aqui.');
    console.log('Callback executada e resposta enviada!');
}

const servidor = http.createServer((req,res) => {
    console.log('Requisição recebida. Aguardando 20 segundos...');
    setTimeout(() => {
        dizerOla(res);
    }, 10000);
});

servidor.listen(3000, '127.0.0.1', () => {
    console.log('Servidor rodando em http://localhost:3000');
});