import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("FuncionarioController - SignUp", () => {
  describe("Criação válida", () => {
    it("Cria um funcionario com parametros corretos.", async () => {
      const res = await serverTest.post("/cadastrar").send({
        nome: "Jorge",
        email: "jorge@email.com",
        senha: "123456aA@",
      });

      expect(res.statusCode).toBe(StatusCodes.CREATED);
    });
  });

  describe("Validação de entradas", () => {
    const testCases = [
      {
        description: "Não deve criar um funcionario com senha não segura.",
        data: { nome: "Jorge", email: "jorge@email.com", senha: "123456" },
        expectedErrors: {
          errors: {
            body: {
              senha: "A senha deve conter pelo menos um caractere especial",
            },
          },
        },
      },
      {
        description: "Não deve criar um funcionario com nome curto.",
        data: { nome: "Jo", email: "jorge@email.com", senha: "123456aA@" },
        expectedErrors: {
          errors: {
            body: {
              nome: "O nome precisa ter 3 no mínimo caracteres",
            },
          },
        },
      },
      {
        description: "Não deve criar um funcionario com email incompleto.",
        data: { nome: "Jorge", email: "jorge@email", senha: "123456aA@" },
        expectedErrors: {
          errors: {
            body: {
              email: "Informe um e-mail válido.",
            },
          },
        },
      },
      {
        description:
          "Não deve criar um funcionario com senha sem letras maiusculas e minusculas.",
        data: { nome: "Jorge", email: "jorge@email.com", senha: "123456@@@@@" },
        expectedErrors: {
          errors: {
            body: {
              senha: "A senha deve conter pelo menos uma letra maiúscula",
            },
          },
        },
      },
    ];

    testCases.map(({description, data, expectedErrors}) => {
        it(description, async() => {
            const response = await serverTest.post('/cadastrar').send(data);

            expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
            expect(response.body).toEqual(expectedErrors);
        })
    })
  });
});
