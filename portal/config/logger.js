const winston = require('winston');
const transportes = [
    // Saída de Console
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
            winston.format.printf(({ timestamp, level, message, ...meta }) => {
                const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
                return `[${timestamp} [${level}]: ${message} ${metaStr}]`;
            })
        )
    })
];
// Conectar com Logstash via TCP na porta 5044
try {
    const LogstashTransport = require('winston-logstash-transport').LogstashTransport;
    transportes.push(
        new LogstashTransport({
            host: '127.0.0.1',
            port: 5044
            level: 'info'
        })
    );
} catch (erro) {
    console.warn('Logstash transport não inicializado. Logs salvos apenas no console local.');
}

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { servico: 'portal-web' },
    transports: transportes
});

module.exports = logger;