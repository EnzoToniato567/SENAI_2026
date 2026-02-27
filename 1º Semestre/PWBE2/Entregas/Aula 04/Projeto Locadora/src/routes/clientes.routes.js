const express = require("express");

const router = express.Router();

const clientesControllers = require("../controllers/clientes.controllers");

router.get("/clientes/listar", clientesControllers.listar);
router.get("/clientes/buscar/:id", clientesControllers.buscar);
router.post("/clientes/cadastrar", clientesControllers.cadastrar);
router.put("/clientes/atualizar/:id", clientesControllers.atualizar);
router.delete("/clientes/excluir/:id", clientesControllers.excluir);

module.exports = router;