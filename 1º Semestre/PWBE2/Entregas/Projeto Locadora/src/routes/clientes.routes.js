const express = require("express");

const router = express.Router();

const clientesControllers = require("../controllers/clientes.controllers");

router.post("/clientes/cadastrar", clientesControllers.cadastrarCliente);

module.exports = router;