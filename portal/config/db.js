const mongoose = require('mongoose');

const conectarBanco = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Portal');
        console.log('MongoDB conectado com sucesso!');
    } catch (erro) {
        console.error('Erro na conexão com o MongoDB:',erro.message);
        proccess.exit(1);
    }
};

module.exports = conectarBanco;