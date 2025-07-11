import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("ProdutoController - GetAll", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "getall.produto@gmail.com";

    await serverTest
      .post("/cadastrar")
      .send({ nome: "Kevin", email, senha: "123456789aA@" });

    const sign = await serverTest
      .post("/entrar")
      .send({ email, senha: "123456789aA@" });

    accessToken = sign.body.accessToken;
  });

  it("Busca todos produtos com parametros", async () => {
    const responseFornecedor = await serverTest.post("/fornecedor").send({
      nome: "Atacamax",
      cnpj: "12.345.678/9123-45",
      telefone: "(81) - 998837891",
      endereco: "Rua Major",
    }).set({ Authorization: `Bearer ${accessToken}` });

    const res1 = await serverTest.post("/produto").send({
      nome: "Sabonete",
      preco: "1.99",
      validade: "2025-01-01",
      quantidade: "100",
      categoria_id: 1,
      fornecedor_id: responseFornecedor.body,
    }).set({ Authorization: `Bearer ${accessToken}` });

    const res = await serverTest.get(
      "/produto?page=1&limit=10&filter=sabonete"
    ).set({ Authorization: `Bearer ${accessToken}` });

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });

  it("Tenta buscar produtos sem token de acesso", async () => {
    const responseFornecedor = await serverTest.post("/fornecedor").send({
      nome: "Atacamax",
      cnpj: "12.345.678/9123-45",
      telefone: "(81) - 998837891",
      endereco: "Rua Major",
    }).set({ Authorization: `Bearer ${accessToken}` });

    const res1 = await serverTest.post("/produto").send({
      nome: "Sabonete",
      preco: "1.99",
      validade: "2025-01-01",
      quantidade: "100",
      categoria_id: 1,
      fornecedor_id: responseFornecedor.body,
    }).set({ Authorization: `Bearer ${accessToken}` });

    const res = await serverTest.get("/produto?page=1&limit=10&filter=sabonete");

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Busca todos produtos sem parametros", async () => {
    const fornecedor = {
      nome: "Atacamax",
      cnpj: "12.345.678/9123-45",
      telefone: "(81) - 998837891",
      endereco: "Rua Major",
    };

    await serverTest.post("/fornecedor").send(fornecedor).set({ Authorization: `Bearer ${accessToken}` });

    const categoriaValida = { nome: "Medicamentos" };

    await serverTest.post("/categorias").send(categoriaValida).set({ Authorization: `Bearer ${accessToken}` });

    await serverTest.post("/produto").send({
      nome: "Sabonete",
      preco: "1.99",
      validade: "2025-01-01",
      quantidade: "100",
      categoria_id: 1,
      fornecedor_id: 1,
    }).set({ Authorization: `Bearer ${accessToken}` });

    const res = await serverTest.get("/produto").set({ Authorization: `Bearer ${accessToken}` });

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });
});
