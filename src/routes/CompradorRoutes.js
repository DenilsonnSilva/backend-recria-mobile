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
    return res
      .status(response.status)
      .json({ message: response.message, status: response.status });
  } catch (error) {
    return res.status(400).json({ message: error, error: 400 });
  }
});

// Login do comprador
router.post("/signin", async (req, res) => {
  try {
    const { cpf, senha } = req.body;

    const result = await CompradorController.signin(cpf, senha);
    return res
      .status(result.status)
      .json({ message: result.message, status: result.status });
  } catch (error) {
    return res.status(400).json({ message: error, error: 400 });
  }
});

module.exports = router;
