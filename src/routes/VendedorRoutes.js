const express = require("express");
const VendedorController = require("../controllers/VendedorController");
const VendedorAuth = require("../middlewares/VendedorAuth");
const router = express.Router();

// Cadastro do vendedor
router.post("/signup", async (req, res) => {
  try {
    const {
      nome,
      email,
      senha,
      descricaoDeVenda,
      endereco,
      pessoaJuridica,
      cpf,
      cnpj,
    } = req.body;

    const response = await VendedorController.signup(
      nome,
      email,
      senha,
      descricaoDeVenda,
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

// Login do vendedor
router.post("/signin", async (req, res) => {
  try {
    const { cpf, senha } = req.body;

    const result = await VendedorController.signin(cpf, senha);
    return res
      .status(result.status)
      .json({ message: result.message, status: result.status });
  } catch (error) {
    return res.status(400).json({ message: error, error: 400 });
  }
});

module.exports = router;
