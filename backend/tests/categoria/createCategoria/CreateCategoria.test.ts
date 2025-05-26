import { StatusCodes } from "http-status-codes";
import { serverTest } from "../../jest.setup";

describe("CategoriaController - Create ", () => {
  describe("Criação válida", () => {
    it("Deve criar uma categoria com nome válido", async () => {
      const categoriaValida = { nome: "Medicamentos" };

      const response = await serverTest
        .post("/categorias")
        .send(categoriaValida);

      expect(response.statusCode).toEqual(StatusCodes.CREATED);
    });
  });

  describe("Validações de entrada", () => {
    const testCases = [
      {
        description: "Não deve aceitar nome muito curto",
        data: { nome: "Me" },
        expectedError: {
          errors: {
            body: {
              nome: "O nome precisa ter 3 no mínimo caracteres",
            },
          },
        },
      },
      {
        description: "Não deve aceitar apenas números no nome",
        data: { nome: "123" },
        expectedError: {
          errors: {
            body: {
              nome: "Apenas letras e espaços são permitidos",
            },
          },
        },
      },
      {
        description: "Não deve aceitar criação sem nome",
        data: {},
        expectedError: {
          errors: {
            body: {
              nome: "Campo obrigatório.",
            },
          },
        },
      },
    ];

    testCases.forEach(({ description, data, expectedError }) => {
      it(description, async () => {
        const response = await serverTest.post("/categorias").send(data);

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
