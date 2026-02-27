require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const clientesRoutes = require("./src/routes/clientes.routes");
const carrosRoutes = require("./src/routes/carros.routes");

app.use("/turmas", clientesRoutes);
app.use("/alunos", carrosRoutes);

const porta = process.env.PORT_APP || 3000;

app.listen(porta, () => {
    console.log(`Online na porta ${porta}`);
});