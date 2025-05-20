import { StatusCodes } from "http-status-codes";
import { serverTest } from "../../jest.setup"


describe('Create - EntradaEstoque', () => {
    it('Cria uma entrada no estoque com parametros corretos.', async() => {
        const res = await serverTest.post('/entrada').send({
            produto_id: 1,
            quantidade: 2,
            entrada_data: '2000-06-17',
        });

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('object');
    });

    it('Cria uma entrada no estoque com parametros errados.', async() => {
        const res = await serverTest.post('/entrada').send({
            produto_id: '7',
            quantidade: '4',
            entrada_data: '17-06-2000',
        });

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(typeof res.body).toEqual('object');
    });
})