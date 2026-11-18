// Importa o cliente do Prometheus
const promClient = require('prom-client');
// Inicializa registro padrão do Prometheus
const registro = new promClient.Registry();
// Coleta de métricas padrão do Node.js
promClient.collectDefaultMetrics({
    register: registro,
    prefix: 'portalweb'
});
// Métrica Personalizada - Contador de requisições
const contadorRequisicoes = new promClient.Counter({
    name: 'portalweb_total_requisicoes',
    help: 'Total de requisições HTTP processadas pelo Portal Web',
    labelNames: ['metodo','rota','status'],
    registers: [registro]
});
// Métrica Personalizada - Histograma de Latência das Requisições
const histogramaDuracaoRequisicao = new promClient.Histogram({
    name: 'portalweb_requisicao_duracao_segundos',
    help: 'Duração e latência das erquisições HTTP em segundos',
    labelNames: ['metodo','rota','status'],
    buckets: [0.01,0.05,0.1,0.3,0.5,1,2,5],
    registers: [registro]
});
// MP (Métrica Personalizada) - Contador de Artigos Criados
const contadorArtigosCriados = new promClient.Counter({
    name: 'portalweb_total_artigos_cadastrados',
    help: 'Número total de artigos publicados na base de dados',
    registers: [registro]
});
// Middleware Express para monitoramento
const middlewareMetricas = (req,res,next) => {
    if(req.path === '/metricas'){
        return next();
    }
    const fimCronometro = histogramaDuracaoRequisicao.startTimer();
    res.on('finish', () => {
        const rota = req.route ? req.baseUrl + req.route.path : req.path;
        const labels = {
            metodo: req.method,
            rota: rota || 'desconhecido',
            status: res.statusCode.toString()
        };
        contadorRequisicoes.inc(labels);
        fimCronometro(labels);
    });
    next();
};

module.exports = {
    registro,
    contadorArtigosCriados,
    middlewareMetricas
};