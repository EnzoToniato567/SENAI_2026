const express = require("express");

const router = express.Router();

const carrosControllers = require("../controllers/carros.controllers");

router.get("/carros/listar", carrosControllers.listar);
router.get("/carros/buscar/:id", carrosControllers.buscar);
router.post("/carros/cadastrar", carrosControllers.cadastrar);
router.put("/carros/atualizar/:id", carrosControllers.atualizar);
router.delete("/carros/excluir/:id", carrosControllers.excluir);

module.exports = router;