require('dotenv').config();
const amqp = require('amqplib');
const axios = require('axios');

const NOME_FILA = 'notificacoes_discord';
const RABBITMQ_URL = process.env.RABBITMQ_URL;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

async function iniciarConsumidor() {
    try {
        const conexao = await amqp.connect(RABBITMQ_URL);
        const canal = await conexao.createChannel();

        await canal.assertQueue(NOME_FILA, {durable: true});
        canal.prefetch(1);
        console.log(`[*] Aguardando mensagens na fila: ${NOME_FILA}`);
        canal.consume(NOME_FILA, async (mensagem) => {
            if(mensagem !== null) {
                const conteudo = JSON.parse(mensagem.content.toString());
                console.log(`[<-] Mensagem recebida da fila: Novo Artigo - "${conteudo.titulo}"`);
                console.log(conteudo);
                try {
                    await axios.post(DISCORD_WEBHOOK_URL, {
                        username: 'PortalDev Notificador',
                        embeds: [
                            {
                                title: `Novo Artigo Publicado: ${conteudo.titulo}`,
                                description: conteudo.resumo,
                                color: 3447003,
                                fields: [
                                    {
                                        name: 'Data de Publicação',
                                        value: new Date(conteudo.data).toLocaleString('pt-BR'),
                                        inline: true
                                    }
                                ],
                                footer: {
                                    text: 'Sistema de Notificações Assíncronas via RabbitMQ'
                                }
                            }
                        ]
                    });
                    console.log('Notificação enviada ao canal do Discord com sucesso!');
                    canal.ack(mensagem);
                } catch (erroHttp) {
                    console.error('[X] Erro ao enviar requisição para o Discordo: ', erroHttp.message);
                    canal.nack(mensagem, false, true);
                }
            }
        });
    } catch (erro) {
        console.error('Erro na conexão com o RabbitMQ: ', erro.message);
        setTimeout(iniciarConsumidor, 5000);    
    }
}

iniciarConsumidor();