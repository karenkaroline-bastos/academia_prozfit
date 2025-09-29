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
        await client.sendMessage(message.from, 'Seja bem-vindo(a) a Academia ProzFit! Escolha um assunto para continuar:\n1. Planos\n2. Horários\n3. Falar com atendente');
    }
    
    // Se a mensagem for uma resposta válida (1, 2 ou 3)
    else if (messageContent === '1') {
        await client.sendMessage(message.from, 'Você escolheu o assunto "Plano". Nossos Planos\nPlano Mensal: R$ 99,90\nPlano Trimestral: R$ 249,90\nPlano Anual: R$ 799,90.\n Quer mais informações?');
    }
    else if (messageContent === '2') {
        await client.sendMessage(message.from, 'Você escolheu o assunto "Horários". Nosso horário de funcionamento é de segunda a sexta, das 6h às 23h.\n Natação terça e quinta, das 6h às 7h e 19h ás 20h.\n Spinning Segunda e quarta, das 6h às 7h e 19h ás 20h.\n Yoga Sexta, das 6h às 7h e 19h ás 20h.');
    }

    else if (messageContent === '3') {
        await client.sendMessage(message.from, 'Você escolheu o assunto "Falar com atendente". Nosso time de suporte está disponível 24/7. Aguarde um momento que um de nossos atendentes irá entrar em contato?');
    }
    else {
        // Caso a pessoa envie algo diferente das opções, pode ser enviado um aviso
        await client.sendMessage(message.from, 'Desculpe, não entendi sua escolha. Por favor, escolha uma das opções: 1. Preço, 2. Horários, 3. Suporte');
    }
});

// Inicializar o cliente
client.initialize();

// Para garantir que qualquer erro na inicialização seja capturado
client.on('error', (err) => {
    console.error('Erro ao inicializar o cliente:', err);
});
