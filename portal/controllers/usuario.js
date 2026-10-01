const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Usuario = require('./models/Usuario');

const segredo = process.env.JWT_SECRET;

const registrarUsuario = async (req,res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({erros: erros.array() });
    }

    const { nome, senha } = req.body;

    try {
        const senhaCriptografada = bcrypt.hashSync(senha, 10);
        const novoUsuario = new Usuario({ nome, senha: senhaCriptografada });
        await novoUsuario.save();
        res.status(201).json({ mensagem: "Usuário registrado com sucesso!"});
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao registrar usuário', erro });
    }
};

module.exports = { registrarUsuario };