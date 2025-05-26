import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("ProdutoController - GetAll", () => {
  it("Busca todos produtos com parametros", async () => {
    const response = await serverTest.post("/produto").send({
      nome: "Sabonete",
      preco: "1.99",
      validade: "2025-01-01",
      quantidade: "100",
      categoria_id: 1,
      fornecedor_id: 1,
    });

    expect(response.statusCode).toBe(StatusCodes.CREATED);

    const res = await serverTest.get(
      "/produto?page=1&limit=10&filter=sabonete"
    );

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });

  it("Busca todos produtos sem parametros", async () => {
    const response = await serverTest.post("/produto").send({
      nome: "Sabonete",
      preco: "1.99",
      validade: "2025-01-01",
      quantidade: "100",
      categoria_id: 1,
      fornecedor_id: 1,
    });

    expect(response.statusCode).toBe(StatusCodes.CREATED);

    const res = await serverTest.get("/produto");

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });
});
