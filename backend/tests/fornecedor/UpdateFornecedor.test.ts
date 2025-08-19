import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";
import { response } from "express";

describe("FornecedorController - Update", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "update.fornecedor@gmail.com";

    await serverTest
      .post("/cadastrar")
      .send({ nome: "Kevin", email, senha: "123456789aA@" });

    const sign = await serverTest
      .post("/entrar")
      .send({ email, senha: "123456789aA@" });

    accessToken = sign.body.accessToken;
  });

  describe("Atualização válida", () => {
    it("Atualiza um fornecedor por um id", async () => {
      const fornecedor = {
          nome: "Atacamax",
          cnpj: "12.345.678/9123-45",
          telefone: "(81) - 998837891",
          endereco: "Rua Major"
      }

      const response1 = await serverTest
        .post("/fornecedores")
        .send(fornecedor)
        .set({ Authorization: `Bearer ${accessToken}` });

      const res = await serverTest.put("/fornecedores/1").send({
        nome: "Atacamax",
        cnpj: "12345678912345",
        telefone: "81998837891",
        endereco: "Rua Major",
      }).set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
  });

  describe("Validação de entradas e parametros", () => {
    const testCases = [
      {
        description:
          "Não deve atualizar um fornecedor com id composto por letras",
        params: { id: "1asd" },
        data: {
          nome: "Atacamax",
          cnpj: "12345678912345",
          telefone: "81998837891",
          endereco: "Rua Major",
        },
        expectedErrors: {
          errors: {
            params: {
              id: "O id precisa ser um número.",
            },
          },
        },
      },
      {
        description: "Não deve atualizar um fornecedor com id 0",
        params: { id: 0 },
        data: {
          nome: "Atacamax",
          cnpj: "12345678912345",
          telefone: "81998837891",
          endereco: "Rua Major",
        },
        expectedErrors: {
          errors: {
            params: {
              id: "Deve ser maior que 0.",
            },
          },
        },
      },
      {
        description: "Não deve atualizar um fornecedor com id negativo",
        params: { id: -1 },
        data: {
          nome: "Atacamax",
          cnpj: "12345678912345",
          telefone: "81998837891",
          endereco: "Rua Major",
        },
        expectedErrors: {
          errors: {
            params: {
              id: "Deve ser maior que 0.",
            },
          },
        },
      },
      {
        description: "Não deve atualizar um fornecedor com nome curto",
        params: { id: 1 },
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
      {
        description: "Não deve atualizar um fornecedor com telefone curto",
        params: { id: 1 },
        data: {
          nome: "Atacamax",
          cnpj: "12345678912345",
          telefone: "81",
          endereco: "Rua Major",
        },
        expectedErrors: {
          errors: {
            body: {
              telefone: "Telefone inválido, precisa ter enter 10 e 14 dígitos",
            },
          },
        },
      },
      {
        description: "Não deve atualizar um fornecedor com campos inválidos",
        params: { id: 1 },
        data: {
          nome: "At",
          cnpj: "123456",
          telefone: "8assd",
          endereco: "R",
        },
        expectedErrors: {
          errors: {
            body: {
              nome: "O nome precisa ter 3 no mínimo caracteres",
              cnpj: "CNPJ inválido, precisa ter exatamente 14 dígitos",
              telefone: "Telefone inválido, precisa ter enter 10 e 14 dígitos",
              endereco: "Precisa ter ao menos 3 caracteres.",
            },
          },
        },
      },
    ];

    testCases.map(({ description, params, data, expectedErrors }) => {
      it(description, async () => {
        const response = await serverTest
                              .put(`/fornecedores/${params.id}`)
                              .send(data)
                              .set({ Authorization: `Bearer ${accessToken}` });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedErrors);
      });
    });
  });
});
