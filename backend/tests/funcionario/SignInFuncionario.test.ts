import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe("FuncionarioController - SignIn", () => {
  beforeAll(async () => {
    const resSignUp = await serverTest.post("/cadastrar").send({
      nome: "Jorge",
      email: "jorge@email.com",
      senha: "123456aA@",
    });
  });

  describe("Busca funcionario de forma válida", () => {
    it("Entra com um funcionario existente", async () => {
      const res = await serverTest.post(`/entrar`).send({
        email: "jorge@email.com",
        senha: "123456aA@",
      });

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("accessToken");
    });
  });

  describe("Validação de parametros", () => {
    const testCases = [
      {
        description: "Não permite um funcionario entrar com email inválido",
        body: { email: "miachk@gmail.com.br", senha: "12346578@Aa" },
        expectedError: {
          errors: {
            default: "E-mail ou senha inválidos",
          },
        },
      },
      {
        description: "Não permite um funcionario entrar com senha inválida",
        body: { email: "jorge@email.com", senha: "123456aA" },
        expectedError: {
          errors: {
            default: "E-mail ou senha inválidos",
          },
        },
      },
    ];

    testCases.forEach(({ description, body, expectedError }) => {
      it(description, async () => {
        const response = await serverTest.post("/entrar").send(body);

        expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(response.body).toEqual(expectedError);
      });
    });
  });
});
