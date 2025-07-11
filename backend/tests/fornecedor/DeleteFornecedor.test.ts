import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("FornecedorController - Delete", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "delete.fornecedor@gmail.com";

    await serverTest
      .post("/cadastrar")
      .send({ nome: "Kevin", email, senha: "123456789aA@" });

    const sign = await serverTest
      .post("/entrar")
      .send({ email, senha: "123456789aA@" });

    accessToken = sign.body.accessToken;
  });

  describe("Deleção válida", () => {
    it("Deve retornar 204 ao deletar fornecedor existente", async () => {
      const fornecedorValido = {
        nome: "Atacamax",
        cnpj: "12345678912345",
        telefone: "81998837891",
        endereco: "Rua Major",
      };
      const res = await serverTest.post("/fornecedor")
        .send(fornecedorValido)
        .set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toEqual(StatusCodes.CREATED);

      const response = await serverTest.delete(
        `/fornecedor/${res.body}`
      ).set({ Authorization: `Bearer ${accessToken}` });

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
  });

 describe("Validação de token de acesso", () => {
    it("Tenta deletar fornecedor sem token de acesso", async () => {
      const fornecedorValido = {
        nome: "Atacamax",
        cnpj: "12345678912345",
        telefone: "81998837891",
        endereco: "Rua Major",
      };
      const res = await serverTest.post("/fornecedor")
        .send(fornecedorValido)
        .set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toEqual(StatusCodes.CREATED);

      const response = await serverTest.delete(`/fornecedor/${res.body}`);

      expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(response.body).toHaveProperty('errors.default');
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
        const response = await serverTest.delete(`/fornecedor/${params}`).set({ Authorization: `Bearer ${accessToken}` });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
