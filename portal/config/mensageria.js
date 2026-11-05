const amqp = require('amqplib');

let canal = null;
const NOME_FILA = 'notificacoes_discord';

async function obterCanal(){
    if(canal) return canal;
    try{
        const conexao = await amqp.connect(process.env.RABBITMQ_URL);
        canal = await conexao.createChannel();
        await canal.assertQueue(NOME_FILA, {durable: true});
        return canal;
    } catch(erro){
        console.error('Falha ao conectar ao RabbitMQ: ', erro.message);
        return null;
    }
}

async function publicarEvento(mensagem) {
    try {
        const canalAtivo = await obterCanal();
        if(!canalAtivo){
            console.warn('RabbitMQ indisponível. Mensagem descartada.');
            return;
        }
        const buffer = Buffer.from(JSON.stringify(mensagem));
        canalAtivo.sendToQueue(NOME_FILA, buffer, { persistent: true});
        console.log(`[RabbitMQ] Evento enviado para a fila "${NOME_FILA}"`);
    } catch (error) {
        console.error('[RabbitMQ] Erro ao enviar mensagem: ', error.message);
    }
}

module.exports = { publicarEvento };