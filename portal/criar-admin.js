const usuario = require('./models/usuario');
const conectarBanco = require('./config/db');
const bcrypt = require('bcryptjs');

async function criarUsuarioInicial() {
    await conectarBanco();

    const nome = 'adamastor';
    const senhaPlana = '123456';

    const usuarioExistente = await usuario.findOne({ nome });
    if (usuarioExistente) {
        console.log(`O usuário "${nome}" já existe no banco!`);
        process.exit(0);
    }

    const senhaCriptografada = bcrypt.hashSync(senhaPlana, 10);

    await usuario.create({
        nome,
        senha: senhaCriptografada
    });

    console.log(`Usuário "${nome}" criado com sucesso!`);
    process.exit(0);
}

criarUsuarioInicial();