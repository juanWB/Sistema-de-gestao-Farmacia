import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("FornecedorController - Delete", () => {
  describe("Deleção válida", () => {
    it("Deve retornar 204 ao deletar fornecedor existente", async () => {
      const fornecedorValido = {
        id: 1,
        nome: "Atacamax",
        cnpj: "12345678912345",
        telefone: "81998837891",
        endereco: "Rua Major",
      };
      const res = await serverTest.post("/fornecedor").send(fornecedorValido);

      expect(res.statusCode).toEqual(StatusCodes.CREATED);

      const response = await serverTest.delete(
        `/fornecedor/${fornecedorValido.id}`
      );

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
  });

  describe("Validação de parametros", () => {
    const testCases = [
      {
        description: "Não deve aceitar id composto por letras",
        params: "1as",
        expectedError: {
          errors: {
            params: {
              id: "O id precisa ser um número",
            },
          },
        },
      },
      {
        description: "Não deve aceitar um id 0",
        params: 0,
        expectedError: {
          errors: {
            params: {
              id: "Deve ser maior que 0.",
            },
          },
        },
      },
      {
        description: "Não deve aceitar um id negativo",
        params: -1,
        expectedError: {
          errors: {
            params: {
              id: "Deve ser maior que 0.",
            },
          },
        },
      },
      {
        description: "Não deve aceitar um id sendo um número decimal",
        params: 1.5,
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
        const response = await serverTest.delete(`/fornecedor/${params}`);

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
