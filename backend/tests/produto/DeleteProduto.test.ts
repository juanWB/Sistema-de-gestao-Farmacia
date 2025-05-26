import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("ProdutoController - Delete", () => {
  describe("Deleção válida", () => {
    it("Deve retornar 204 ao deletar categoria existente", async () => {
      const produtoValido = {
        id: 1,
        nome: "Sabonete",
        preco: "1.99",
        validade: "2025-01-01",
        quantidade: "100",
        categoria_id: 1,
        fornecedor_id: 1,
      };

      const res = await serverTest.post("/produto").send(produtoValido);

      expect(res.statusCode).toEqual(StatusCodes.CREATED);

      const response = await serverTest.delete(`/produto/${produtoValido.id}`);

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
  });

  describe("Validação de parametros", () => {
     const testCases = [
      {
        description: "Não deve deletar um produto com id composto por letras",
        params: {id: "1as"},
        expectedError:   {
          errors: {
            params: {
              id: "O id precisa ser um número.",
            },
          },
        },
      },
      {
        description: "Não deve deletar um produto com id 0",
        params: {id: 0},
        expectedError:   {
          errors: {
            params: {
              id: "Deve ser maior que 0.",
            },
          },
        },
      },
      {
        description: "Não deve deletar um produto por um id negativo",
        params: {id: -1},
        expectedError:   {
          errors: {
            params: {
              id: "Deve ser maior que 0.",
            },
          },
        },
      },
      {
        description: "Não deve deletar um produto com id composto por número decimal",
        params: {id: 1.5},
        expectedError:  {
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
        const response = await serverTest.delete(`/produto/${params.id}`);

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
