import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("ProdutoController - GetById", () => {
  describe("Busca produto de forma válida", () => {
    it("Busca um produto por um id", async () => {

      const responseFornecedor = await serverTest.post("/fornecedor").send({
        nome: "Atacamax",
        cnpj: "12.345.678/9123-45",
        telefone: "(81) - 998837891",
        endereco: "Rua Major",
      });

      const res1 = await serverTest.post("/produto").send({
        nome: "Sabonete",
        preco: "1.99",
        validade: "2025-01-01",
        quantidade: "100",
        categoria_id: 1,
        fornecedor_id: responseFornecedor.body,
      });

      const res = await serverTest.get(`/produto/1`);
      expect(res.status).toBe(StatusCodes.OK);
      expect(typeof res.body).toEqual("object");
    });
  });

  describe("Validação de parametros", () => {
    const testCases = [
      {
        description: "Não deve buscar um produto com id composto por letras",
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
        description: "Não deve buscar um produto por um id 0",
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
        description: "Não deve buscar um produto por um id negativo",
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
          "Não deve buscar um produto com id composto por número decimal",
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
        const response = await serverTest.get(`/produto/${params.id}`);

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
