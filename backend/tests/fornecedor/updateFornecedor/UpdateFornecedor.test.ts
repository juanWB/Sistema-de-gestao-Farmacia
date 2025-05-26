import { StatusCodes } from "http-status-codes";
import { serverTest } from "../../jest.setup";
import { response } from "express";

describe("FornecedorController - Update", () => {
  describe("Atualização válida", () => {
    it("Atualiza um fornecedor por um id", async () => {
      const res = await serverTest.put("/fornecedor/1").send({
        nome: "Atacamax",
        cnpj: "12345678912345",
        telefone: "81998837891",
        endereco: "Rua Major",
      });

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
                              .put(`/fornecedor/${params.id}`)
                              .send(data);

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedErrors);
      });
    });
  });
});
