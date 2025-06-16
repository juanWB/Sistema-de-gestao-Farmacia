import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("ProdutoController - GetById", () => {
  describe("Busca produto de forma válida", () => {
    it("Busca um produto por um id", async () => {
     await serverTest.post("/funcionario").send({
        nome: "Jorge",
        email: "jorge@email.com",
        senha: "123456aA@",
      });

      const res = await serverTest.get(`/funcionario/1`);
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
        const response = await serverTest.get(`/funcionario/${params.id}`);

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
