import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("FuncionarioController - GetAll", () => {
  it("Busca todos funcionarios com parametros", async () => {
    await serverTest.post("/funcionario").send({
        nome: "Jorge",
        email: "jorge@email.com",
        senha: "123456aA@",
      });


    const res = await serverTest.get(
      "/funcionario?page=1&limit=10"
    );

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });

  it("Busca todos funcionarios sem parametros", async () => {
     await serverTest.post("/funcionario").send({
        nome: "Jorge",
        email: "jorge@email.com",
        senha: "123456aA@",
      });


    const res = await serverTest.get(
      "/funcionario"
    );

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });
});
