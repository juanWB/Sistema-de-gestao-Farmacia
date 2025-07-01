import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("GetAll - Categorias", () => {
  it("Busca todas categorias", async () => {

    const res = await serverTest.get("/categorias");

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res.body).toEqual("object");
  });
});
