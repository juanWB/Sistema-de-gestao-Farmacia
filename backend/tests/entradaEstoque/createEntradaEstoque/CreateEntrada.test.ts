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

    it('Tenta criar uma entrada no estoque com letras errados.', async() => {
        const res = await serverTest.post('/entrada').send({
            produto_id: 'dois',
            quantidade: 'quatro',
            entrada_data: '2000-06-17',
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

     it('Tenta criar uma entrada no estoque com parametros vazios.', async() => {
        const res = await serverTest.post('/entrada').send({
            produto_id: '   ',
            quantidade: '   ',
            entrada_data: '2000-06-17',
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

})