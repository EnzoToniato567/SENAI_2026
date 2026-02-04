const con = require("../data/conecction");

const listarItens = async (req, res) => {
    try {
        const [lista] = await con.query("SELECT * FROM lista");

        res.json(lista).status(200).end();
    } catch (err) {
        res.json(err).status(500).end();
    }
};

const cadastrarItem = async (req, res) => {
    try {
        const {item, valor} = req.body;
        const insert = `INSERT INTO lista (item, valor) 
        VALUES (?, ?)`;

        const result = await con.query(insert, [item, valor]);

        res.json(result).status(200).end();
    } catch (err) {
        res.json(err).status(500).end();
    }
};

module.exports = {
    listarItens,
    cadastrarItem
}