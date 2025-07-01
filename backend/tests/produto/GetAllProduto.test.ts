import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("ProdutoController - GetAll", () => {
  it("Busca todos produtos com parametros", async () => {
    const responseFornecedor = await serverTest.post("/fornecedor").send({
      nome: "Atacamax",
      cnpj: "12.345.678/9123-45",
      telefone: "(81) - 998837891",
      endereco: "Rua Major",
    });

    const res1 = await serverTest.post("/produto").send({
      nome: "Sabonete",
      preco: "1.99",
      validade: "2025-01-01",
      quantidade: "100",
      categoria_id: 1,
      fornecedor_id: responseFornecedor.body,
    });

    const res = await serverTest.get(
      "/produto?page=1&limit=10&filter=sabonete"
    );

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });

  it("Busca todos produtos sem parametros", async () => {
    const fornecedor = {
      nome: "Atacamax",
      cnpj: "12.345.678/9123-45",
      telefone: "(81) - 998837891",
      endereco: "Rua Major",
    };

    await serverTest.post("/fornecedor").send(fornecedor);

    const categoriaValida = { nome: "Medicamentos" };

    await serverTest.post("/categorias").send(categoriaValida);

    await serverTest.post("/produto").send({
      nome: "Sabonete",
      preco: "1.99",
      validade: "2025-01-01",
      quantidade: "100",
      categoria_id: 1,
      fornecedor_id: 1,
    });

    const res = await serverTest.get("/produto");

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });
});
