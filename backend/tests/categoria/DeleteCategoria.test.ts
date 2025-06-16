import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("CategoriasController - Delete", () => {
  describe("Deleção válida", () => {
    it("Deve retornar 204 ao deletar categoria existente", async () => {
      const categoriaValida = { id: 1, nome: "Medicamentos" };

      const res = await serverTest
        .post("/categorias")
        .send(categoriaValida);

      expect(res.statusCode).toEqual(StatusCodes.CREATED);

      const response = await serverTest.delete(
        `/categorias/${categoriaValida.id}`
      );

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
  });

  describe("Validações de parametros", () => {
    const testCases = [
      {
        description: "Não deve aceitar id composto por letras",
        params: "1as",
        expectedError:   {
          errors: {
            params: {
              id: "O id precisa ser um número.",
            },
          },
        },
      },
      {
        description: "Não deve aceitar um id 0",
        params: 0,
        expectedError:   {
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
        expectedError:   {
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
        expectedError:  {
          errors: {
            params: {
              id: "Deve ser um inteiro.",
            },
          },
        },
      },
    ];

    testCases.forEach(({ description, params, expectedError }) => {
      it(description, async () => {
        const response = await serverTest.delete(`/categorias/${params}`);

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
