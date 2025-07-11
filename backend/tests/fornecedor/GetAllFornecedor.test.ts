import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("GetAll - Fornecedor", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "getall.fornecedor@gmail.com";

    await serverTest
      .post("/cadastrar")
      .send({ nome: "Kevin", email, senha: "123456789aA@" });

    const sign = await serverTest
      .post("/entrar")
      .send({ email, senha: "123456789aA@" });

    accessToken = sign.body.accessToken;
  });

  it("Busca todos fornecedores", async () => {
    const fornecedor = {
      nome: "Atacamax",
      cnpj: "12.345.678/9123-45",
      telefone: "(81) - 998837891",
      endereco: "Rua Major",
    };

    const response = await serverTest
      .post("/fornecedor")
      .send(fornecedor)
     .set({ Authorization: `Bearer ${accessToken}` });

    const res = await serverTest
      .get("/fornecedor")
     .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });

  it("Tenta buscar fornecedores sem token de acesso", async () => {
    const fornecedor = {
      nome: "Atacamax",
      cnpj: "12.345.678/9123-45",
      telefone: "(81) - 998837891",
      endereco: "Rua Major",
    };

    const response = await serverTest
      .post("/fornecedor")
      .send(fornecedor)
     .set({ Authorization: `Bearer ${accessToken}` });

    const res = await serverTest
      .get("/fornecedor");

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });
});
