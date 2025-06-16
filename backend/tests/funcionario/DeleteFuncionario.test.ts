import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("FuncionarioController - Delete", () => {
  describe("Deleção válida", () => {
    it("Deve retornar 204 ao deletar funcionario existente", async () => {
      await serverTest.post("/funcionario").send({
        nome: "Jorge",
        email: "jorge@email.com",
        senha: "123456aA@",
      });

      const response = await serverTest.delete(
        `/funcionario/1`
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
        const response = await serverTest.delete(`/funcionario/${params}`);

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
