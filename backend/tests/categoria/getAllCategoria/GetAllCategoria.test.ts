import { StatusCodes } from "http-status-codes";
import { serverTest } from "../../jest.setup";

describe("GetAll - Categorias", () => {
  it("Busca todas categorias", async () => {
    const categoriaValida = { nome: "Medicamentos" };

    const response = await serverTest.post("/categorias").send(categoriaValida);

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const res = await serverTest.get("/categorias");

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });
});
