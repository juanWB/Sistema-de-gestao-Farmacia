import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("EntradaEstoqueController - Create", () => {
  let produtoId: number | undefined = undefined;
  beforeAll(async () => {
    const responseFornecedor = await serverTest.post("/fornecedor").send({
      nome: "Atacamax",
      cnpj: "12.345.678/9123-45",
      telefone: "(81) - 998837891",
      endereco: "Rua Major",
    });

    const responseCategoria = await serverTest
      .post("/categorias")
      .send({ nome: "Higiene" });

    const responseProduto = await serverTest.post("/produto").send({
      nome: "Sabonete",
      preco: "1.99",
      validade: "2025-01-01",
      quantidade: "100",
      categoria_id: responseCategoria.body,
      fornecedor_id: responseFornecedor.body,
    });

    produtoId = responseProduto.body;
  });
  describe("Criação válida", () => {
    it("Cria uma entrada no estoque com parametros corretos.", async () => {
      const res = await serverTest.post("/entrada").send({
        quantidade: 2,
        entrada_data: "2000-06-17",
        produto_id: produtoId,
      });

      expect(res.statusCode).toEqual(StatusCodes.CREATED);
    });
  });

  describe("Validações de parametros e entrada", () => {
    const testCases = [
      {
        description: "Não deve aceitar id e quantidade com letras",
        data: {
          produto_id: "dois",
          quantidade: "quatro",
          entrada_data: "2000-06-17",
        },
        expectedError: {
          errors: {
            body: {
              produto_id: "O id precisar ser um número.",
              quantidade: "A quantidade precisar ser um número.",
            },
          },
        },
      },
      {
        description: "Não deve aceitar uma entrada vazia.",
        data: {
          produto_id: "   ",
          quantidade: "   ",
          entrada_data: "2000-06-17",
        },
        expectedError: {
          errors: {
            body: {
              produto_id: "Deve ser maior que 0.",
              quantidade: "Deve ser maior que 0.",
            },
          },
        },
      },
      {
        description: "Não deve aceitar uma entrada vazia.",
        data: {
          produto_id: "   ",
          quantidade: "   ",
          entrada_data: "2000-06-17",
        },
        expectedError: {
          errors: {
            body: {
              produto_id: "Deve ser maior que 0.",
              quantidade: "Deve ser maior que 0.",
            },
          },
        },
      },
    ];
    testCases.forEach(({ description, data, expectedError }) => {
      it(description, async () => {
        const response = await serverTest.post("/entrada").send(data);

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
