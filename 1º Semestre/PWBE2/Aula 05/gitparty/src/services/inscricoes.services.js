const prisma = require("../data/prisma");

const limiteInscricoes = async (eventoId, limite) => {
    const evento = await prisma.eventos.findUnique({
        where: { id: eventoId },
        include: {
            inscricoes: true
        }
    });

    const numeroInscricoes = evento.inscricoes.filter(inscricao => inscricao.status === "CONFIRMADA").length;

    if (numeroInscricoes >= evento.capacidade_maxima) {
        return "LISTA_ESPERA";
    } else {
        return "CONFIRMADA";
    }
};

const inscricaoDuplicada = async (usuarioId, eventoId) => {
    const evento = await prisma.eventos.findUnique({
        where: { id: eventoId },
        include: {
            inscricoes: true
        }
    });

    const inscrito = evento.inscricoes.filter(inscricao => inscricao.usuariosId == usuarioId).length;

    if (inscrito > 0) {
        throw new Error("Usuário já inscrito no evento!");
    }
};

const prazoCancelamento = async (usuarioId, eventoId) => {
    const evento = await prisma.eventos.findUnique({
        where: { id: eventoId },
    });

    const agora = new Date();
    const inicioEvento = new Date(evento.data_evento);

    // quantidade de milisegundos por hora (24 horas antes)
    const limiteCancelamento = new Date(inicioEvento.getTime() - 24 * 60 * 60 * 1000) 

    if (agora > limiteCancelamento) {
        throw new Error("O prazo do cancelamento já chegou ao limite!")
    } else {
        return "Cancelamento permitido"
    }
};

const listaEspera = async (eventoId) => {
    const evento = await prisma.eventos.findUnique({
        where: { id: eventoId },
        include: {
            inscricoes: true
        }
    });

    const espera = evento.inscricoes.filter(inscricao => inscricao.status === "LISTA_ESPERA");

    if (espera.length > 0) {
        const primeiro = espera[0] // primeiro da lista no array

        await prisma.inscricoes.update({
            where: { id: primeiro.id },
            data: { status: "CONFIRMADA" }
        });

        return "Status do usuário alterado na lista de esperada para confirmada!" 
    } else {
        return "Nenhum participante na lista de espera"
    }
};

const participanteRegistrado = async (eventoId) => {
    const evento = await prisma.eventos.findUnique({
        where: { id: eventoId },
        include: {
            inscricoes: true
        }
    });
    
    const agora = new Date();

    if (agora > new Date(evento.data_evento)) {
        throw new Error("Evento não pode ser exclído após o acontecimento!")
    } 

    if (evento.inscricoes.length > 0) {
        throw new Error("O evento possui participantes e não pode ser cacelado!")
    }

    await prisma.eventos.delete({
        where: { id: eventoId }
    });

    return "Evento exclído com sucesso!"
};

const eventoEncerrado = async (eventoId) => {
    const evento = await prisma.eventos.update({ // atualiza o evento
        where: { id: eventoId },
        data: { status: "ENCERRADO" }
    });

    await prisma.inscricoes.updateMany({ // atualiza vários de uma vez
        where: { eventosId: eventoId,
            status: "LISTA_ESPERA"
         },
        data: { status: "CANCELADA" }
    });

    return "Evento encerraodo e lista de espera cancelada!"
}

module.exports = {
    limiteInscricoes,
    inscricaoDuplicada,
    prazoCancelamento,
    listaEspera, 
    participanteRegistrado,
    eventoEncerrado
};