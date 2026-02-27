const prisma = require("../data/prisma");

const listar = async (req, res) => {
    const lista = await prisma.clientes.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.clientes.findUnique({
        where: { id: Number(id) }
    });

    res.json(item).status(200).end();
};

const cadastrar = async (req, res) => {
    try {
        const cliente = req.body;

        let nome = cliente.nome;
        let cpf = cliente.cpf;
        let email = cliente.email;
        let cnh = cliente.cnh;

        ////////////////////////////////////////////////////////////////////////////////////////

        cliente.nome = nome;

        nome = nome.trim();

        if (nome === "") {
            return res.status(400).json({erro:"O Nome não pode conter apenas espaços"});
        }

        if (nome.split(" ").length < 2) {
            return res.status(400).json({erro:"O Nome não deve conter pelo menos 2 caracters."});
        }

        ////////////////////////////////////////////////////////////////////////////////////////

        cliente.cpf = cpf;

        cpf = cpf.trim()

        if (!cpf) {
            return res.status(400).json({erro:"O CPF não pode estar indefinido."});         
        }

        cpf = cpf.replace(".", "");
        cpf = cpf.replace(".", "");
        cpf = cpf.replace("-", "");
        cpf = cpf.replace(" ", "");  

        if (cpf.length !== 11) {
            return res.status(400).json({erro:"O CPF deve conter 11 números."});                   
        }

        if (isNaN(cpf)) {
            return res.status(400).json({erro:"O CPF deve conter apenas números."});                   
        }

        ////////////////////////////////////////////////////////////////////////////////////////

        cliente.email = email;
        
        email = email.trim();

        if (!email) {
            return res.status(400).json({erro:"O Email não pode estar indefinido."});
        }

        if (email.length === 0) {
            return res.status(400).json({erro:"O campo Email não pode estar vazio."});
        }

        if (email.includes(" ")) {
            return res.status(400).json({erro:"O campo Email não pode ter espaços"});
        }

        if (!email.includes("@")) {
            return res.status(400).json({erro:"O Email deve conter @"});
        }

        if (!email.includes(".")) {
            return res.status(400).json({erro:"O Email deve conter ."});
        }

        email = email.toLowerCase();

        const emailExiste = await prisma.clientes.findUnique({
            where: {
                email: email
            }
        });

        if (emailExiste) {
            return res.status(400).json({erro: "Já existe um email igual a esse cadastrado."});
        }

        ////////////////////////////////////////////////////////////////////////////////////////

        cliente.cnh = cnh;

        cnh = cnh.trim();

        if (!cnh) {
            return res.status(400).json({erro:"A CNH não pode estar indefinida."});
        }

        if (cnh.length === 0) {
            return res.status(400).json({erro:"O campo CNH não pode estar vazio."});
        }

        const cnhArray = cnh.split("");

        if (isNaN(cnhArray[0])) {
            return res.status(400).json({erro:"O primeiro caractere da CNH deve ser numérico."});
        }

        ////////////////////////////////////////////////////////////////////////////////////////

        const dadosCliente = await prisma.clientes.create({ 
            data: cliente 
        }); 
        return res.status(201).json(dadosCliente);


    } catch (error) {
        console.log(error);
        return res.status(500).json();
    }
}

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.clientes.update({
        where: { id: Number(id) },
        data: dados
    });

    res.json(item).status(200).end();
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.clientes.delete({
        where: { id: Number(id) }
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