import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";


describe('GetAll - Fornecedor', () => {
    it('Busca todos fornecedores', async() => {
         const fornecedor = {
          nome: "Atacamax",
          cnpj: "12.345.678/9123-45",
          telefone: "(81) - 998837891",
          endereco: "Rua Major",
        }

        const response = await serverTest.post("/fornecedor").send(fornecedor);

        const res = await serverTest.get('/fornecedor');

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    })
})