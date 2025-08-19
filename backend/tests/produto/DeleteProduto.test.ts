import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("ProdutoController - Delete", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "delete.produto@gmail.com";

    await serverTest
      .post("/cadastrar")
      .send({ nome: "Kevin", email, senha: "123456789aA@" });

    const sign = await serverTest
      .post("/entrar")
      .send({ email, senha: "123456789aA@" });

    accessToken = sign.body.accessToken;
  });

  describe("Deleção válida", () => {
    it("Deve retornar 204 ao deletar categoria existente", async () => {
      const responseFornecedor = await serverTest.post("/fornecedores").send({
        nome: "Atacado",
        cnpj: "12.345.678/9123-45",
        telefone: "(81) - 998837891",
        endereco: "Rua Major",
      }).set({ Authorization: `Bearer ${accessToken}` });

      const responseProduto = await serverTest
        .post("/produtos")
        .send({
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: responseFornecedor.body,
        }).set({ Authorization: `Bearer ${accessToken}` });

      expect(responseProduto.statusCode).toEqual(StatusCodes.CREATED);

      const response = await serverTest.delete(`/produtos/${responseProduto.body}`).set({ Authorization: `Bearer ${accessToken}` });

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
  });

  describe("Validação de token de acesso", () => {
    it("Tenta deletar produto sem token de acesso", async () => {
      const responseFornecedor = await serverTest.post("/fornecedores").send({
        nome: "Atacado",
        cnpj: "12.345.678/9123-44",
        telefone: "(81) - 998837891",
        endereco: "Rua Major",
      }).set({ Authorization: `Bearer ${accessToken}` });

      const responseProduto = await serverTest
        .post("/produtos")
        .send({
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: responseFornecedor.body,
        }).set({ Authorization: `Bearer ${accessToken}` });

      expect(responseProduto.statusCode).toBe(StatusCodes.CREATED);

      const response = await serverTest.delete(`/produtos/${responseProduto.body}`);

      expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(response.body).toHaveProperty('errors.default');
    });
  });

  describe("Validação de parametros", () => {
    const testCases = [
      {
        description: "Não deve deletar um produto com id composto por letras",
        params: { id: "1as" },
        expectedError: {
          errors: {
            params: {
              id: "O id precisa ser um número.",
            },
          },
        },
      },
      {
        description: "Não deve deletar um produto com id 0",
        params: { id: 0 },
        expectedError: {
          errors: {
            params: {
              id: "Deve ser maior que 0.",
            },
          },
        },
      },
      {
        description: "Não deve deletar um produto por um id negativo",
        params: { id: -1 },
        expectedError: {
          errors: {
            params: {
              id: "Deve ser maior que 0.",
            },
          },
        },
      },
      {
        description:
          "Não deve deletar um produto com id composto por número decimal",
        params: { id: 1.5 },
        expectedError: {
          errors: {
            params: {
              id: "Deve ser um inteiro",
            },
          },
        },
      },
    ];

    testCases.forEach(({ description, params, expectedError }) => {
      it(description, async () => {
        const response = await serverTest.delete(`/produtos/${params.id}`).set({ Authorization: `Bearer ${accessToken}` });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
