const prisma = require("../data/prisma");
const { limiteInscricoes } = require("../services/inscricoes.services");

const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        await inscricaoDuplicada(data.usuariosId, data.eventosId);

        const status = await limiteInscricoes(data.eventosId);

        if (status !== "") data.status = status;

        const item = await prisma.inscricoes.create({
             data 
        });
        res.status(201).json(item).end();

    } catch (err) {
        res.status(500).json(err.toString()).end();
    }

};

const listar = async (req, res) => {
    const lista = await prisma.inscricoes.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.inscricoes.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.inscricoes.update({
        where: { id : Number(id) },
        data: dados
    });

    res.json(item).status(200).end();
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.inscricoes.delete({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}
