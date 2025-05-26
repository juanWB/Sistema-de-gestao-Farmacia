import { StatusCodes } from "http-status-codes";
import { serverTest } from "../../jest.setup";

describe("SaidaEstoqueController - Create", () => {
  describe("Criação válida", () => {
    it("Cria uma saida no estoque com parametros corretos.", async () => {
      const res = await serverTest.post("/saida").send({
        produto_id: 1,
        quantidade: 2,
        saida_data: "2000-06-17",
      });

      expect(res.statusCode).toEqual(StatusCodes.CREATED);
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
          const response = await serverTest.post("/saida").send(data);

          expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
          expect(response.body).toEqual(expectedError);
        });
      });
    });
});
