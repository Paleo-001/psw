const mongoose = require('mongoose');

const artigoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    resumo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        default: null
    },
    destaque: {
        type: Boolean,
        default: true
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('artigo', artigoSchema);