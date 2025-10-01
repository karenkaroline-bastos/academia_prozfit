const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Criando uma nova instância do cliente
const client = new Client();

// Quando o cliente estiver pronto, execute esse código (apenas uma vez)
client.once('ready', () => {
    console.log('Cliente está pronto!');
});

// Quando o QR Code for gerado
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Quando o cliente estiver autenticado
client.on('authenticated', () => {
    console.log('Cliente autenticado!');
});

// Função para perguntar se o cliente quer mais informações ou encerrar atendimento
async function perguntarMaisInformacao(message) {
    await client.sendMessage(
        message.from,
        'Você gostaria de mais informações ou deseja encerrar o atendimento?\nDigite "4" para mais informações ou "5" para encerrar o atendimento.'
    );
}

// Quando uma mensagem for recebida
client.on('message', async (message) => {
    console.log('Mensagem recebida: ', message.body); // Log da mensagem recebida

    const messageContent = message.body.toLowerCase();

    // Se a mensagem contém palavras-chave como 'oi', 'olá', 'bom dia', etc.
    if (
        messageContent.includes('oi') ||
        messageContent.includes('olá') ||
        messageContent.includes('ola') ||
        messageContent.includes('eae') ||
        messageContent.includes('bom dia') ||
        messageContent.includes('boa tarde') ||
        messageContent.includes('boa noite')
    ) {
        // Envia uma mensagem de boas-vindas e apresenta as opções de menu
        await client.sendMessage(
            message.from,
            'Seja bem-vindo(a) a Academia ProzFit!\n Menu Principal\nEscolha um assunto para continuar:\n1. Planos\n2. Horários|Aulas\n3. Falar com atendente'
        );
    }

    // Se a mensagem for uma resposta válida (1, 2 ou 3)
    else if (messageContent === '1') {
        await client.sendMessage(
            message.from,
            'Você escolheu o assunto "Plano".\nNossos Planos:\nPlano Mensal: R$ 99,90\nPlano Trimestral: R$ 249,90\nPlano Anual: R$ 799,90.\n Quer mais informações?'
        );
        // Perguntar se quer mais informações ou encerrar
        await perguntarMaisInformacao(message);
    }
    else if (messageContent === '2') {
        await client.sendMessage(
            message.from,
            'Você escolheu o assunto "Horários".\nNossos horários:\nNatação: Terça e Quinta, das 6h às 19h\nSpinning: Segunda e Quarta, das 6h às 19h\nYoga: Quarta e Sexta, das 8h às 20h\nMusculação: Segunda a Sexta, das 6h às 23h\nSábado, das 8h às 17h\nDomingo e feriados, das 8h às 14h.'
        );
        // Perguntar se quer mais informações ou encerrar
        await perguntarMaisInformacao(message);
    }
    else if (messageContent === '3') {
        await client.sendMessage(
            message.from,
            'Você escolheu o assunto "Falar com atendente".\nNosso time de suporte está disponível 24/7.\nAguarde um momento que um de nossos atendentes irá entrar em contato com você em breve!'
        );
    }

    // Se a resposta for 4 (mais informações) ou 5 (encerrar atendimento)
    else if (messageContent === '4') {
        // Retornar para o menu principal
        await client.sendMessage(
            message.from,
            'Seja bem-vindo(a) a Academia ProzFit!\n Menu Principal\nEscolha um assunto para continuar:\n1. Planos\n2. Horários|Aulas\n3. Falar com atendente'
        );
        // Se a resposta for 5 (encerrar atendimento)
    } else if (messageContent === '5') {
            await client.sendMessage(message.from, 'Atendimento encerrado. Se precisar de mais ajuda, basta enviar uma mensagem!');
        }
    else {
        // Caso a pessoa envie algo diferente das opções, pode ser enviado um aviso
        await client.sendMessage(
            message.from,
            'Desculpe, não entendi sua escolha.\nPor favor, escolha uma das opções: 1. Planos, 2. Horários, 3. Suporte'
        );
    }
});

// Inicializar o cliente
client.initialize();

// Para garantir que qualquer erro na inicialização seja capturado
client.on('error', (err) => {
    console.error('Erro ao inicializar o cliente:', err);
});
