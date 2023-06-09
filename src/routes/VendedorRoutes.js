const express = require("express");
const VendedorController = require("../controllers/VendedorController");
const UserAuth = require("../middlewares/UserAuth");
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
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(400).json({ message: error, error: 400 });
  }
});

// Login do vendedor
router.post("/signin", async (req, res) => {
  try {
    const { identification, senha } = req.body;

    const result = await VendedorController.signin(identification, senha);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(400).json({ message: error, error: 400 });
  }
});

module.exports = router;
