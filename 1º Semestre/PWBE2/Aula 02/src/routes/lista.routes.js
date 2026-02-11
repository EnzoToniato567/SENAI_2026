const express = require("express");
const router = express.Router();

const listaControllers = require("../controllers/lista.controller");

router.get("/lista", listaControllers.listarItens);
router.post("/lista/cadastro", listaControllers.cadastrarItem);
router.put("/lista/atualizar/:id", listaControllers.atualizarItem);
router.delete("/lista/deletar/:id", listaControllers.deletarItem)


module.exports = router;