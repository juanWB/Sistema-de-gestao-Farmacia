import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("FornecedorController - GetById", () => {
  describe("Busca fornecedor de forma válida", () => {
    it("Busca um fornecedor por um id", async () => {
      const responseFornecedor = await serverTest.post("/fornecedor").send({
        nome: "Atacamax",
        cnpj: "12.345.678/9123-45",
        telefone: "(81) - 998837891",
        endereco: "Rua Major",
      });

      const res = await serverTest.get(`/fornecedor/${responseFornecedor.body}`);
      expect(res.status).toBe(StatusCodes.OK);
      expect(typeof res.body).toEqual("object");
    });
  });

  describe("Validação de parametros", () => {
    const testCases = [
      {
        description: "Não deve buscar um fornecedor com id composto por letras",
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
        description: "Não deve buscar um fornecedor por um id 0",
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
        description: "Não deve buscar um fornecedor por um id negativo",
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
          "Não deve buscar um fornecedor com id composto por número decimal",
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
        const response = await serverTest.get(`/fornecedor/${params.id}`);

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
