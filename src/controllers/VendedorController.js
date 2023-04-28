const Vendedor = require("../models/vendedor.model");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/auth");

module.exports = {
  async signup(
    nome,
    email,
    senha,
    descricaoDeVenda,
    endereco,
    pessoaJuridica,
    cpf,
    cnpj
  ) {
    try {
      const findVendedor = await Vendedor.findOne({ cpf });
      if (!findVendedor) {
        const newVendedor = await Vendedor.signup({
          nome,
          email,
          senha: bcript.hashSync(senha, 8),
          descricaoDeVenda,
          endereco,
          pessoaJuridica,
          cpf: this.pessoaJuridica ? null : cpf,
          cnpj: this.pessoaJuridica ? cnpj : null,
        });
        return { message: newVendedor, status: 200 };
      } else {
        return {
          message: "Um vendedor com esse CPF já está cadastrado",
          status: 400,
        };
      }
    } catch (error) {
      return { message: error, status: 400 };
    }
  },
  async signin(cpf, senha) {
    try {
      const foundVendedor = await Vendedor.findOne({ cpf });
      if (!foundVendedor) {
        return { message: "CPF não encontrado", status: 400 };
      } else {
        const passwordMatch = await bcript.compare(senha, foundVendedor.senha);

        if (!passwordMatch) {
          return {
            message: "Credenciais fornecidas inválidas",
            status: 400,
          };
        } else {
          const token = jwt.sign({ id: foundVendedor._id }, config.secret, {
            expiresIn: 86400,
          });
          return { message: token, status: 200 };
        }
      }
    } catch (error) {
      return { message: error, status: 400 };
    }
  },
};
