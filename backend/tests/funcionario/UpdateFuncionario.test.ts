import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("FuncionarioController - Update", () => {
  describe("Criação válida", () => {
    it("Atualiza um funcionario por um id", async () => {
      const res = await serverTest.put("/funcionario/1").send({
        nome: "Jorge",
        email: "jorge@email.com",
        senha: "123456aA@",
      });

      expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
  });

  describe("Validações de entrada e parametros", () => {
    const testCases = [
      {
        description: "Não deve atualizar um funcionario por um id composto por letras.",
        params: {id: "1asd"},
        data: { nome: "Jorge", email: "jorge@email.com", senha: "123456aA@" },
        expectedErrors: {
          errors: {
            params: {
              id: "Deve ser um número",
            },
          },
        },
      },
      {
        description: "Não deve atualizar um funcionario com id 0",
        params: {id: 0},
        data: { nome: "Jorge", email: "jorge@email.com", senha: "123456aA@" },
        expectedErrors: {
          errors: {
            params: {
              id: "Deve ser maior que 0.",
            },
          },
        },
      },
       {
        description: "Não deve atualizar um funcionario com id negativo",
        params: {id: -1 },
        data: { nome: "Jorge", email: "jorge@email.com", senha: "123456aA@" },
        expectedErrors: {
          errors: {
            params: {
              id: "Deve ser maior que 0.",
            },
          },
        },
      },
       {
        description: "Não deve atualizar um funcionario com nome curto",
        params: {id: 1 },
        data: { nome: "Jo", email: "jorge@email.com", senha: "123456aA@" },
        expectedErrors: {
          errors: {
            body: {
              nome: "O nome precisa ter no mínimo 3 caracteres",
            },
          },
        },
      },
        {
        description: "Não deve atualizar um funcionario com email incompleto.",
        params: {id: 1 },
        data: { nome: "Jorge", email: "jorge@email", senha: "123456aA@" },
        expectedErrors: {
          errors: {
            body: {
              email: "O email precisa ter no mínimo 13 caracteres",
            },
          },
        },
      },
       {
        description: "Não deve atualizar um funcionario com senha sem letras maiusculas e minusculas.",
        params: {id: 1 },
        data: { nome: "Jorge", email: "jorge@email.com", senha: "123456@" },
        expectedErrors: {
          errors: {
            body: {
              senha: "A senha deve conter pelo menos uma letra maiúscula",
            },
          },
        },
      },
    ];
     testCases.map(({description, params, data, expectedErrors}) => {
        it(description, async() => {
            const response = await serverTest.put(`/funcionario/${params.id}`).send(data);

            expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
            expect(response.body).toEqual(expectedErrors);
        })
     })
  });
});
