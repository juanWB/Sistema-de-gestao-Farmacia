import { StatusCodes } from "http-status-codes";
import { serverTest } from "../../jest.setup";

describe("EntradaEstoqueController - Create", () => {
  describe("Criação válida", () => {
    it("Cria uma entrada no estoque com parametros corretos.", async () => {
       const produtoValido = {
        id: 1,
        nome: "Sabonete",
        preco: "1.99",
        validade: "2025-01-01",
        quantidade: "100",
        categoria_id: 1,
        fornecedor_id: 1,
      };

      const response = await serverTest.post("/produto").send(produtoValido);

      const res = await serverTest.post("/entrada").send({
        produto_id: 1,
        quantidade: 2,
        entrada_data: "2000-06-17",
      });

      expect(res.statusCode).toEqual(StatusCodes.CREATED);
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
          const response = await serverTest.post("/entrada").send(data);

          expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
          expect(response.body).toEqual(expectedError);
        });
      });
    });
});
