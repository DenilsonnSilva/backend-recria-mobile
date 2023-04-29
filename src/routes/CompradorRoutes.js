const express = require("express");
const CompradorController = require("../controllers/CompradorController");
const UserAuth = require("../middlewares/UserAuth");
const router = express.Router();

// Cadastro do comprador
router.post("/signup", async (req, res) => {
  try {
    const {
      nome,
      email,
      senha,
      descricaoDeCompra,
      endereco,
      pessoaJuridica,
      cpf,
      cnpj,
    } = req.body;

    const response = await CompradorController.signup(
      nome,
      email,
      senha,
      descricaoDeCompra,
      endereco,
      pessoaJuridica,
      cpf,
      cnpj
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(400).json({ message: error, error: 400 });
  }
});

// Login do comprador
router.post("/signin", async (req, res) => {
  try {
    const { identification, senha } = req.body;

    const result = await CompradorController.signin(identification, senha);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(400).json({ message: error, error: 400 });
  }
});

module.exports = router;
