import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("Categorias - Update", () => {
  describe("Atualização válida", () => {
    it("Atualiza uma categoria com parametros corretos", async () => {
      const categoriaValida = { nome: "Medicamentos" };

      const response = await serverTest
        .post("/categorias")
        .send(categoriaValida);

      expect(response.statusCode).toEqual(StatusCodes.CREATED);
      
      const res = await serverTest.put("/categorias/1").send({
        nome: "Medicamento",
      });

      expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
      expect(typeof res.body).toEqual("object");
    });
  });

  describe("Validações de parametros e entrada", () => {
    const testCases = [
      {
        description: "Tenta atualizar uma categoria com id com letras",
        data: { nome: "Medicamento" },
        params: "1asa",
        expectedError: {
          errors: {
            params: {
              id: "O id precisa ser um número.",
            },
          },
        },
      },
      {
        description: "Não deve aceitar nome curto",
        data: { nome: "Me" },
        params: 1,
        expectedError: {
          errors: {
            body: {
              nome: "O nome precisa ter 3 no mínimo caracteres",
            },
          },
        },
      },
      {
        description: "Não deve aceitar nome composto por numeros",
        data: { nome: "123" },
        params: "1",
        expectedError: {
          errors: {
            body: {
              nome: "Nome inválido apenas letras e espaços são permitidos",
            },
          },
        },
      },
      {
        description: "Não deve aceitar id menor que 1",
        data: { nome: "Medicamento" },
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
        description: "Não deve aceitar id igual a 0",
        data: { nome: "Medicamento" },
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
        description: "Não deve aceitar id sendo um número decimal",
        data: { nome: "Medicamento" },
        params: 1.5,
        expectedError: {
          errors: {
            params: {
              id: "Deve ser um inteiro",
            },
          },
        },
      },
      {
        description: "Não deve aceitar nome vazio",
        data: { nome: "" },
        params: 1,
        expectedError: {
          errors: {
            body: {
              nome: "Nome inválido apenas letras e espaços são permitidos",
            },
          },
        },
      },
    ];

    testCases.forEach(({ description, data, params, expectedError }) => {
      it(description, async () => {
        const response = await serverTest
          .put(`/categorias/${params}`)
          .send(data);

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
