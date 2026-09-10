const logRequisicoes = (req,res,next) => {
    const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}`;
    console.log(logEntry);
    next();
};

const rotaNaoEncontrada = (req,res,next) => {
    const erro = new Error('Página não encontrada');
    erro.status = 404;
    next(erro);
};

const manipuladorErros = (err,req,res,next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).render('error', {
        message: err.message,
        status
    });
};

module.exports = { logRequisicoes, rotaNaoEncontrada, manipuladorErros};