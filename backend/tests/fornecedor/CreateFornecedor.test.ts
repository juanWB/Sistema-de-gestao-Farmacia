import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("FornecedorController - Create", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "create.fornecedor@gmail.com";
    await serverTest
      .post("/cadastrar")
      .send({ nome: "Kevin", email, senha: "123456789aA@" });
    const sign = await serverTest
      .post("/entrar")
      .send({ email, senha: "123456789aA@" });

    accessToken = sign.body.accessToken;
  });

  describe("Cria um fornecedor", () => {
    const testCases = [
      {
        description: "Cria um fornecedor com parametros corretos.",
        data: {
          nome: "Atacado",
          cnpj: "12345678912345",
          telefone: "81998837891",
          endereco: "Rua Major",
        },
      },
      {
        description:
          "Cria um fornecedor com parametros corretos com caracteres especiais.",
        data: {
          nome: "Atacado",
          cnpj: "12.345.678/9123-45",
          telefone: "(81) - 998837891",
          endereco: "Rua Major",
        },
      },
    ];

    testCases.map(({ description, data }) => {
      it(description, async () => {
        const response = await serverTest
          .post("/fornecedores")
          .send(data)
          .set({ Authorization: `Bearer ${accessToken}` });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);
      });
    });
  });

  describe("Validação de token de acesso", () => {
    it("Tenta criar fornecedor sem token de acesso", async () => {
      const response = await serverTest
        .post("/fornecedores")
        .send({
          nome: "Atacado",
          cnpj: "12.345.678/9123-45",
          telefone: "(81) - 998837891",
          endereco: "Rua Major",
        });

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        expect(response.body).toHaveProperty("errors.default");
    });
  });

  describe("Validação de entradas", () => {
    const testCases = [
      {
        description: "Não deve criar um fornecedor com nome curto.",
        data: {
          nome: "At",
          cnpj: "12345678912345",
          telefone: "81998837891",
          endereco: "Rua Major",
        },
        expectedErrors: {
          errors: {
            body: {
              nome: "O nome precisa ter 3 no mínimo caracteres",
            },
          },
        },
      },
    ];

    testCases.map(({ description, data, expectedErrors }) => {
      it(description, async () => {
        const response = await serverTest
          .post("/fornecedores")
          .send(data)
          .set({ Authorization: `Bearer ${accessToken}` });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedErrors);
      });
    });
  });
});
