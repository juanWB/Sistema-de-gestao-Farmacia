import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("SaidaEstoqueController - Create", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "create.saida@gmail.com";

    await serverTest
      .post("/cadastrar")
      .send({ nome: "Kevin", email, senha: "123456789aA@" });

    const sign = await serverTest
      .post("/entrar")
      .send({ email, senha: "123456789aA@" });

    accessToken = sign.body.accessToken;
  });

  describe("Criação válida", () => {
    it("Cria uma saida no estoque com parametros corretos.", async () => {
      const resFornercedor = await serverTest
        .post("/fornecedores")
        .send({
          nome: "Atacamax",
          cnpj: "12.345.678/9123-45",
          telefone: "(81) - 998837891",
          endereco: "Rua Major",
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      const resCreateProduto = await serverTest
        .post("/produtos")
        .send({
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: resFornercedor.body,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      const res = await serverTest
        .post("/saidas")
        .send({
          produto_id: resCreateProduto.body,
          quantidade: 2,
          saida_data: "2000-06-17",
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toEqual(StatusCodes.CREATED);
    });
  });

  describe("Validação de token de acesso", () => {
    it("Tenta criar uma saida do estoque sem token de acesso.", async () => {
      const resFornercedor = await serverTest
        .post("/fornecedores")
        .send({
          nome: "Atacamax",
          cnpj: "12.345.678/9123-45",
          telefone: "(81) - 998837891",
          endereco: "Rua Major",
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      const resCreateProduto = await serverTest
        .post("/produtos")
        .send({
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: resFornercedor.body,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      const res = await serverTest
        .post("/saidas")
        .send({
          produto_id: resCreateProduto.body,
          quantidade: 2,
          saida_data: "2000-06-17",
        });

      expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(res.body).toHaveProperty('errors.default');
    });
  });

  describe("Validações de parametros e saida", () => {
    const testCases = [
      {
        description: "Não deve aceitar id e quantidade com letras",
        data: {
          produto_id: "dois",
          quantidade: "quatro",
          saida_data: "2000-06-17",
        },
        expectedError: {
          errors: {
            body: {
              produto_id: "O id precisa ser um número.",
              quantidade: "A quantidade precisa ser um número.",
            },
          },
        },
      },
      {
        description: "Não deve aceitar uma saida vazia.",
        data: {
          produto_id: "   ",
          quantidade: "   ",
          saida_data: "2000-06-17",
        },
        expectedError: {
          errors: {
            body: {
              produto_id: "Deve ser maior que 0.",
              quantidade: "Deve ser maior que 0.",
            },
          },
        },
      },
      {
        description: "Não deve aceitar uma saida vazia.",
        data: {
          produto_id: "   ",
          quantidade: "   ",
          saida_data: "2000-06-17",
        },
        expectedError: {
          errors: {
            body: {
              produto_id: "Deve ser maior que 0.",
              quantidade: "Deve ser maior que 0.",
            },
          },
        },
      },
    ];
    testCases.forEach(({ description, data, expectedError }) => {
      it(description, async () => {
        const response = await serverTest
          .post("/saidas")
          .send(data)
          .set({ Authorization: `Bearer ${accessToken}` });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
