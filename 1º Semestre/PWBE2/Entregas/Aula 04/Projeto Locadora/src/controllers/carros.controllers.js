const prisma = require("../data/prisma");

const cadastrarCarro = async (req, res) => {
    try {
        const carro = req.body;

        let placa = carro.placa;
        let modelo = carro.modelo
        let marca = carro.marca
        let ano = carro.ano;

        ////////////////////////////////////////////////////////////////////////////////////////
        
        carro.placa = placa;

        if (!placa) {
            return res.status(400).json({erro:"A Placa não pode estar indefinida."});
        }

        placa = placa.trim();

        if (placa.length === 0) {
            return res.status(400).json({erro:"O campo Placa não pode estar vazio."});
        }

        if (placa.includes(" ")) {
            return res.status(400).json({erro:"A Placa não pode ter espaços"});
        }

        if (placa.length !== 7) {
            return res.status(400).json({erro:"A Placa deve conter exatamente 7 caracteres."});
        }

        placa = placa.replace("-", "");
        placa = placa.toUpperCase();

        const placaExiste = await prisma.carros.findUnique({
            where: {
                placa: placa
            }
        });

        if (placaExiste) {
            return res.status(400).json({erro: "Já existe um carro cadastrado com esta placa."});
        }

        ////////////////////////////////////////////////////////////////////////////////////////

        carro.modelo = modelo;

        modelo = modelo.trim();

        if (modelo === "") {
            return res.status(400).json({erro:"O campo Modelo não pode estar vazio."});
        };

        if (modelo.includes(" ")) {
            return res.status(400).json({erro:"O campo Modelo não pode ter espaços"});
        }

        console.log(modelo.toLowerCase());
        
        modelo = modelo.toLowerCase();

        ////////////////////////////////////////////////////////////////////////////////////////

        carro.marca = marca;

        marca = marca.trim();

        if (marca === "") {
            return res.status(400).json({erro:"O campo marca não pode estar vazio"});
        }

        if (marca.includes(" ")) {
            return res.status(400).json({erro:"O campo Marca não pode ter espaços"});
        }

        console.log(marca.toLowerCase());
        
        marca = marca.toLowerCase();

        ////////////////////////////////////////////////////////////////////////////////////////

        ano = String(ano);

        if (ano.length !== 4) {
            return res.status(400).json({erro:"O Ano deve ter exatamente 4 caracteres."});
        };

        ano = ano.split("");

        if (isNaN(ano)) {
            return res.status(400).json({erro:"O Ano deve conter apenas números."});
        }

        ////////////////////////////////////////////////////////////////////////////////////////

        const dadosCarro = await prisma.carros.create({ 
            data: carro 
        }); 
        return res.status(201).json(dadosCarro);

        
    } catch (error) {
        console.log(error);
        return res.status(500).json();
    }
};

module.exports = {
    cadastrarCarro
}