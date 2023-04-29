// Configuração do projeto
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Conexão com o Mongo
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Roteamento
const vendedorRoutes = require("./src/routes/VendedorRoutes");
const compradorRoutes = require("./src/routes/CompradorRoutes");

// Definindo as URLs
app.use("/vendedor", vendedorRoutes);
app.use("/comprador", compradorRoutes);

app.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`);
});
