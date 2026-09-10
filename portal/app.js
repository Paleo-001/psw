// Importar Bibliotecas
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const conectarBanco = require('./config/db');

// Importar Middlewares
const {
  logRequisicoes,
  rotaNaoEncontrada,
  manipuladorErros} = require('./middleware/gerenciamento');
const {
  sanitizarEntradas,
  verificarPermissaoAdmin} = require('./middleware/seguranca');

// Importar Rotas
const rotasNavegacao = require('./routes/navegacao');
// const rotasAdministracao = '';

const app = express();

// Inicializar o BD
conectarBanco();

// Configurar o motor de visualização
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// Decodificação em Páginas estáticas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares customizados
app.use(logRequisicoes);
app.use(sanitizarEntradas);

// Prefixos de Rotas
app.use('/', rotasNavegacao);
// app.use('/admin', verificarPermissaoAdmin, rotasAdministracao);

// Capturar 404 e tratar erros
app.use(rotaNaoEncontrada);
app.use(manipuladorErros);

module.exports = app;