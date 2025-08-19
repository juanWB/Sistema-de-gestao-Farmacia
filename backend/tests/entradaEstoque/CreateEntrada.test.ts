import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("EntradaEstoqueController - Create", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "create.entrada@gmail.com";
    await serverTest
      .post("/cadastrar")
      .send({ nome: "Kevin", email, senha: "123456789aA@" });
    const sign = await serverTest
      .post("/entrar")
      .send({ email, senha: "123456789aA@" });

    accessToken = sign.body.accessToken;
  });

  let produtoId: number | undefined = undefined;
  beforeAll(async () => {
    const responseFornecedor = await serverTest
      .post("/fornecedores")
      .send({
        nome: "Atacamax",
        cnpj: "12.345.678/9123-45",
        telefone: "(81) - 998837891",
        endereco: "Rua Major",
      })
      .set({ Authorization: `Bearer ${accessToken}` });

    const responseProduto = await serverTest
      .post("/produtos")
      .send({
        nome: "Sabonete",
        preco: "1.99",
        validade: "2025-01-01",
        quantidade: "100",
        categoria_id: 1,
        fornecedor_id: responseFornecedor.body,
      })
      .set({ Authorization: `Bearer ${accessToken}` });

    produtoId = responseProduto.body;
  });

  describe("Criação válida", () => {
    it("Cria uma entrada no estoque com parametros corretos.", async () => {
      const res = await serverTest
        .post("/entradas")
        .send({
          quantidade: 2,
          entrada_data: "2000-06-17",
          produto_id: produtoId,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toEqual(StatusCodes.CREATED);
    });
  });

  describe("Validação de token de acesso", () => {
    it("Tenta criar entrada sem token de acesso", async() => {
      const res = await serverTest.post("/entradas").send({
        quantidade: 2,
        entrada_data: "2000-06-17",
        produto_id: produtoId,
      });

      expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(res.body).toHaveProperty('errors.default');
    });
  });

  describe("Validações de parametros e entrada", () => {
    const testCases = [
      {
        description: "Não deve aceitar id e quantidade com letras",
        data: {
          produto_id: "dois",
          quantidade: "quatro",
          entrada_data: "2000-06-17",
        },
        expectedError: {
          errors: {
            body: {
              produto_id: "O id precisar ser um número.",
              quantidade: "A quantidade precisar ser um número.",
            },
          },
        },
      },
      {
        description: "Não deve aceitar uma entrada vazia.",
        data: {
          produto_id: "   ",
          quantidade: "   ",
          entrada_data: "2000-06-17",
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
        description: "Não deve aceitar uma entrada vazia.",
        data: {
          produto_id: "   ",
          quantidade: "   ",
          entrada_data: "2000-06-17",
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
          .post("/entradas")
          .send(data)
          .set({ Authorization: `Bearer ${accessToken}` });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
