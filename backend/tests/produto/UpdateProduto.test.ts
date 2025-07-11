import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("Update - Produto", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "update.produto@gmail.com";

    await serverTest
      .post("/cadastrar")
      .send({ nome: "Kevin", email, senha: "123456789aA@" });

    const sign = await serverTest
      .post("/entrar")
      .send({ email, senha: "123456789aA@" });

    accessToken = sign.body.accessToken;
  });

  describe("Criação válida", () => {
    it("Atualiza um produto por um id", async () => {
      const responseFornecedor = await serverTest
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
          fornecedor_id: responseFornecedor.body,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      const res = await serverTest
        .put(`/produto/${resCreateProduto.body}`)
        .send({
          nome: "Sabão",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: 1,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(typeof res.body).toEqual("object");
    });
  });

  describe("Validação de token de acesso", () => {
    it("Tenta atualizar produto sem token de acesso", async () => {
      const responseFornecedor = await serverTest
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
          fornecedor_id: responseFornecedor.body,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      const res = await serverTest
        .put(`/produto/${resCreateProduto.body}`)
        .send({
          nome: "Sabão",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: 1,
        });

      expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      expect(res.body).toHaveProperty("errors.default");
    });
  });

  describe("Validações de entrada", () => {
    it("Tenta atualizar um produto por um id composto por letras", async () => {
      const res = await serverTest
        .put("/produto/1as")
        .send({
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: 1,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(typeof res.body).toEqual("object");
    });

    it("Tenta atualizar um produto por um id 0", async () => {
      const res = await serverTest
        .put("/produto/0")
        .send({
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: 1,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(typeof res.body).toEqual("object");
    });

    it("Tenta atualizar um produto por um id negativo", async () => {
      const res = await serverTest
        .put("/produto/-1")
        .send({
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: 1,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(typeof res.body).toEqual("object");
    });

    it("Tenta atualizar um produto com quantidade negativa.", async () => {
      const res = await serverTest
        .put("/produto/1")
        .send({
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "-100",
          categoria_id: 1,
          fornecedor_id: 1,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(typeof res.body).toEqual("object");
    });

    it("Tenta atualizar um produto com categoria 0.", async () => {
      const res = await serverTest
        .put("/produto/1")
        .send({
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 0,
          fornecedor_id: 1,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(typeof res.body).toEqual("object");
    });

    it("Tenta atualizar um produto com fornecedor 0.", async () => {
      const res = await serverTest
        .put("/produto/1")
        .send({
          nome: "Sabonete",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: 0,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(typeof res.body).toEqual("object");
    });

    it("Tenta atualizar um produto com preco negativo.", async () => {
      const res = await serverTest
        .put("/produto/1")
        .send({
          nome: "Sabonete",
          preco: "-1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: 1,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(typeof res.body).toEqual("object");
    });

    it("Tenta atualizar um produto com nome vazio.", async () => {
      const res = await serverTest
        .put("/produto/1")
        .send({
          nome: "",
          preco: "1.99",
          validade: "2025-01-01",
          quantidade: "100",
          categoria_id: 1,
          fornecedor_id: 1,
        })
        .set({ Authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(typeof res.body).toEqual("object");
    });
  });
});
