const express = require("express");

const router = express.Router();

const listaControllers = require("../controllers/lista2.controller");

router.get("/lista", listaControllers.listarItens);
router.post("/lista/cadastro", listaControllers.cadastrarItem)

module.exports = router;