import { StatusCodes } from "http-status-codes";
import { serverTest } from "../../jest.setup"


describe('EntradaEstoqueController - GetAll', () => {
    it('Busca todas entradas no estoque', async() => {
        const res = await serverTest.get('/entrada');

        console.log('rodou')
        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    });
})