const Comprador = require("../models/comprador.model");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/auth");

module.exports = {
  async signup(
    nome,
    email,
    senha,
    descricaoDeCompra,
    endereco,
    pessoaJuridica,
    cpf,
    cnpj
  ) {
    try {
      if (pessoaJuridica) {
        const findComprador = await Comprador.findOne({ cnpj });
        if (!findComprador) {
          const newComprador = await Comprador.create({
            nome,
            email,
            senha: bcript.hashSync(senha, 8),
            descricaoDeCompra,
            endereco,
            pessoaJuridica,
            cpf: null,
            cnpj,
          });

          return { message: newComprador, status: 200 };
        } else {
          return {
            message: "Um comprador com esse CNPJ já está cadastrado",
            status: 400,
          };
        }
      } else {
        const findComprador = await Comprador.findOne({ cpf });
        if (!findComprador) {
          const newComprador = await Comprador.create({
            nome,
            email,
            senha: bcript.hashSync(senha, 8),
            descricaoDeCompra,
            endereco,
            pessoaJuridica,
            cpf,
            cnpj: null,
          });

          return { message: newComprador, status: 200 };
        } else {
          return {
            message: "Um comprador com esse CPF já está cadastrado",
            status: 400,
          };
        }
      }
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  },
  async signin(identification, senha) {
    try {
      const foundComprador = await Comprador.findOne({
        $or: [
          { email: identification },
          { cpf: identification },
          { cnpj: identification },
        ],
      });
      if (!foundComprador) {
        return { message: "Usuário não encontrado", status: 400 };
      } else {
        const passwordMatch = await bcript.compare(senha, foundComprador.senha);

        if (!passwordMatch) {
          return {
            message: "Credenciais fornecidas inválidas",
            status: 400,
          };
        } else {
          const token = jwt.sign({ id: foundComprador._id }, config.secret, {
            expiresIn: 86400,
          });
          return { message: token, status: 200 };
        }
      }
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  },
};
