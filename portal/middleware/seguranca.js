const jwt = require('jsonwebtoken');

const sanitizarEntradas = (req,res,next) => {
    const sanitizar = (obj) => {
        if (!obj || typeof obj !== 'object') return;
        for (const chave in obj){
            if(chave.startsWith('$') || chave.includes('.')){
                delete obj[chave];
            } else if (typeof obj[chave] === 'object'){
                sanitizar(obj[chave]);
            }
        }
    };

    sanitizar(req.body);
    sanitizar(req.query);
    sanitizar(req.params);
    next();
};

const verificarPermissaoAdmin = (req,res,next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (erro, usuarioDecodificado) => {
        if (erro) {
            res.clearCookie('token');
            return res.redirect('/login');
        }
        req.usuario = usuarioDecodificado;
        next();
    });
};

module.exports = { sanitizarEntradas, verificarPermissaoAdmin };