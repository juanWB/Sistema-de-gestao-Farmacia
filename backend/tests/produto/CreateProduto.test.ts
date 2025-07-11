import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("ProdutoController - Create", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "create.produto@gmail.com";

    await serverTest
      .post("/cadastrar")
      .send({ nome: "Kevin", email, senha: "123456789aA@" });

    const sign = await serverTest
      .post("/entrar")
      .send({ email, senha: "123456789aA@" });

    accessToken = sign.body.accessToken;
  });

  describe("Criação válida", () => {
    it("Cria um produto com parametros corretos.", async () => {

      const responseFornecedor = await serverTest
        .post("/fornecedor")
        .send({
          nome: "Atacado",
          cnpj: "12.345.678/9123-45",
          telefone: "(81) - 998837891",
          endereco: "Rua Major",
        }).set({ Authorization: `Bearer ${accessToken}` });

      const res = await serverTest.post("/produto").send({
        nome: "Sabonete",
        preco: "1.99",
        validade: "2025-01-01",
        quantidade: "100",
        categoria_id: 1,
        fornecedor_id: responseFornecedor.body,
      }).set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toBe(StatusCodes.CREATED);
    });
  });

   describe("Validação de token de acesso", () => {
    it("Tenta criar um produto sem token de acesso.", async () => {

      const responseFornecedor = await serverTest
        .post("/fornecedor")
        .send({
          nome: "Atacado",
          cnpj: "12.345.678/9123-45",
          telefone: "(81) - 998837891",
          endereco: "Rua Major",
        }).set({ Authorization: `Bearer ${accessToken}` });

      const res = await serverTest.post("/produto").send({
        nome: "Sabonete",
        preco: "1.99",
        validade: "2025-01-01",
        quantidade: "100",
        categoria_id: 1,
        fornecedor_id: responseFornecedor.body,
      });

      expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      expect(res.body).toHaveProperty('errors.default');

    });
  });

  describe("Validações de entrada", () => {
    const testCases = [
      {
        description: "Não deve criar um produto com nome curto.",
        data: {
          nome: "S",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: 1,
        },
        expectedError: {
          errors: {
            body: {
              nome: "O nome precisa ter 3 no mínimo caracteres",
            },
          },
        },
      },
      {
        description: "Não deve criar um produto com preço negativo.",
        data: {
          nome: "Sabonete",
          preco: "-1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: 1,
        },
        expectedError: {
          errors: {
            body: {
              preco: "O preço precisar ser maior do que 0.",
            },
          },
        },
      },
      {
        description: "Não deve criar um produto com quantidade negativa.",
        data: {
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "-100",
          categoria_id: 1,
          fornecedor_id: 1,
        },
        expectedError: {
          errors: {
            body: {
              quantidade: "O campo quantidade não pode ser menor que 0",
            },
          },
        },
      },
      {
        description: "Não deve criar um produto com categoria 0.",
        data: {
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: 0,
        },
        expectedError: {
          errors: {
            body: {
              fornecedor_id: "O id precisar ser maior do que 0.",
            },
          },
        },
      },
      {
        description: "Não deve criar um produto com fornecedor 0.",
        data: {
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 0,
          fornecedor_id: 1,
        },
        expectedError: {
          errors: {
            body: {
              categoria_id: "O id precisar ser maior do que 0.",
            },
          },
        },
      },
      {
        description: "Não deve criar um produto com categoria e fornecedor 0.",
        data: {
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 0,
          fornecedor_id: 0,
        },
        expectedError: {
          errors: {
            body: {
              categoria_id: "O id precisar ser maior do que 0.",
              fornecedor_id: "O id precisar ser maior do que 0.",
            },
          },
        },
      },
      {
        description:
          "Não deve criar um produto com categoria e fornecedor letras.",
        data: {
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: "a",
          fornecedor_id: "a",
        },
        expectedError: {
          errors: {
            body: {
              categoria_id: "Campo obrigatório",
              fornecedor_id: "Campo obrigatório",
            },
          },
        },
      },
      {
        description:
          "Não deve criar um produto com categoria e fornecedor negativos.",
        data: {
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: -1,
          fornecedor_id: -1,
        },
        expectedError: {
          errors: {
            body: {
              categoria_id: "O id precisar ser maior do que 0.",
              fornecedor_id: "O id precisar ser maior do que 0.",
            },
          },
        },
      },
    ];

    testCases.forEach(({ description, data, expectedError }) => {
      it(description, async () => {
        const response = await serverTest.post("/produto").send(data).set({ Authorization: `Bearer ${accessToken}` });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
