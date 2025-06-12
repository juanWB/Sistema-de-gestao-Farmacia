import { StatusCodes } from "http-status-codes";
import { serverTest } from "../../jest.setup";

describe("GetAll - SaidaEstoque", () => {
  it("Busca todas saidas no estoque", async () => {
    await serverTest.post("/fornecedor").send({
      nome: "Atacamax",
      cnpj: "12.345.678/9123-45",
      telefone: "(81) - 998837891",
      endereco: "Rua Major",
    });

    await serverTest.post("/categorias").send({ nome: "Medicamentos" });

    await serverTest.post("/produto").send({
      nome: "Sabonete",
      preco: "1.99",
      validade: "2025-01-01",
      quantidade: "100",
      categoria_id: 1,
      fornecedor_id: 1,
    });

    await serverTest.post("/saida").send({
      produto_id: 1,
      quantidade: 2,
      saida_data: "2000-06-17",
    });

    const res = await serverTest.get("/saida");

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });
});
