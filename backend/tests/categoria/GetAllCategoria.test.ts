import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("GetAll - Categorias", () => {
  let accessToken = '';
  beforeAll(async() => {
    const email = 'getall.categoria@gmail.com';
    await serverTest.post('/cadastrar').send({nome: 'Kevin', email, senha: '123456789aA@'});
    const sign = await serverTest.post('/entrar').send({email, senha: '123456789aA@'});

    accessToken = sign.body.accessToken;
  })

  it("Busca todas categorias", async () => {


    const res = await serverTest.get("/categorias")
      .set({Authorization: `Bearer ${accessToken}`});

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });

  it("Tenta buscar todas categorias sem token de acesso", async () => {


    const res = await serverTest.get("/categorias");

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });
});
