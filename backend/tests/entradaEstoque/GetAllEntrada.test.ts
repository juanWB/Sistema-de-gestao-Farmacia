import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("EntradaEstoqueController - GetAll", () => {
  it("Busca todas entradas no estoque", async () => {
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
      fornecedor_id: 1,});

    const res1 = await serverTest.post("/entrada").send({
      produto_id: 1,
      quantidade: 2,
      entrada_data: "2000-06-17",
    });

    const res2 = await serverTest.get("/entrada");

    expect(res2.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res2.body).toEqual("object");
  });
});
