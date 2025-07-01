import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("ProdutoController - Create", () => {
  describe("Criação válida", () => {
    it("Cria um produto com parametros corretos.", async () => {

      const responseFornecedor = await serverTest
        .post("/fornecedor")
        .send({
          nome: "Atacamax",
          cnpj: "12.345.678/9123-45",
          telefone: "(81) - 998837891",
          endereco: "Rua Major",
        });

      const res = await serverTest.post("/produto").send({
        nome: "Sabonete",
        preco: "1.99",
        validade: "2025-01-01",
        quantidade: "100",
        categoria_id: 1,
        fornecedor_id: responseFornecedor.body,
      });

      expect(res.statusCode).toBe(StatusCodes.CREATED);
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
        const response = await serverTest.post("/produto").send(data);

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
