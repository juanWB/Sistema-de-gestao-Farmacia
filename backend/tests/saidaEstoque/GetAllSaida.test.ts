import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("GetAll - SaidaEstoque", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "getAll.saida@gmail.com";

    await serverTest
      .post("/cadastrar")
      .send({ nome: "Kevin", email, senha: "123456789aA@" });

    const sign = await serverTest
      .post("/entrar")
      .send({ email, senha: "123456789aA@" });

    accessToken = sign.body.accessToken;
  });

  it("Busca todas saidas no estoque", async () => {
    const resFornercedor = await serverTest
      .post("/fornecedor")
      .send({
        nome: "Atacado",
        cnpj: "12.345.678/9123-45",
        telefone: "(81) - 998837891",
        endereco: "Rua Major",
      })
      .set({ Authorization: `Bearer ${accessToken}` });

    const resCreateProduto = await serverTest
      .post("/produto")
      .send({
        nome: "Sabonete",
        preco: "1.99",
        validade: "2025-01-01",
        quantidade: "100",
        categoria_id: 1,
        fornecedor_id: resFornercedor.body,
      })
      .set({ Authorization: `Bearer ${accessToken}` });

    await serverTest
      .post("/saida")
      .send({
        produto_id: resCreateProduto.body,
        quantidade: 2,
        saida_data: "2000-06-17",
      })
      .set({ Authorization: `Bearer ${accessToken}` });

    const res = await serverTest
      .get("/saida")
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });

  it("Tenta buscar todas saidas no estoque sem token de acesso", async () => {
    const resFornercedor = await serverTest
      .post("/fornecedor")
      .send({
        nome: "Atacado",
        cnpj: "12.345.678/9123-45",
        telefone: "(81) - 998837891",
        endereco: "Rua Major",
      })
      .set({ Authorization: `Bearer ${accessToken}` });

    const resCreateProduto = await serverTest
      .post("/produto")
      .send({
        nome: "Sabonete",
        preco: "1.99",
        validade: "2025-01-01",
        quantidade: "100",
        categoria_id: 1,
        fornecedor_id: resFornercedor.body,
      })
      .set({ Authorization: `Bearer ${accessToken}` });

    await serverTest
      .post("/saida")
      .send({
        produto_id: resCreateProduto.body,
        quantidade: 2,
        saida_data: "2000-06-17",
      })
      .set({ Authorization: `Bearer ${accessToken}` });

    const res = await serverTest.get("/saida");

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });
});
