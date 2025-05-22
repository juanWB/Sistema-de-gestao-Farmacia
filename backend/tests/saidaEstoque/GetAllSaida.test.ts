import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup"

describe('GetAll - SaidaEstoque', () => {
    it('Busca todas saidas no estoque', async() => {
        const res = await serverTest.get('/saida');

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    });
})