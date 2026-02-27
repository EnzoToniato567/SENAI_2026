const express = require("express");

const router = express.Router();

const carrosControllers = require("../controllers/carros.controllers");

router.post("/carros/cadastrar", carrosControllers.cadastrarCarro);

module.exports = router;