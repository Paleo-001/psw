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
    // Cenas dos próximos capítulos
    next();
};

module.exports = { sanitizarEntradas, verificarPermissaoAdmin };