import { StatusCodes } from "http-status-codes";
import { serverTest } from "../../jest.setup";


describe('GetAll - Fornecedor', () => {
    it('Busca todos fornecedores', async() => {
        const res = await serverTest.get('/fornecedor');

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    })
})