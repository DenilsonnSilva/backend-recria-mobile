const mongoose = require("mongoose");

const compradorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  descricaoDeVenda: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  pessoaJuridica: {
    type: Boolean,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comprador", compradorSchema);
