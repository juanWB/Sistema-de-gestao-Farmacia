import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup"


describe('Create - SaidaEstoque', () => {
    it('Cria uma saida no estoque com parametros corretos.', async() => {
        const res = await serverTest.post('/saida').send({
            produto_id: 1,
            quantidade: 2,
            saida_data: '2000-06-17',
        });

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta criar uma saida no estoque com letras.', async() => {
        const res = await serverTest.post('/saida').send({
            produto_id: 'dois',
            quantidade: 'quatro',
            saida_data: '2000-06-17',
        }); 

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

     it('Tenta criar uma saida no estoque com parametros negativos.', async() => {
        const res = await serverTest.post('/saida').send({
            produto_id: -1,
            quantidade: -1,
            saida_data: '2000-06-17',
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta criar uma saida no estoque com parametros iguais a 0.', async() => {
        const res = await serverTest.post('/saida').send({
            produto_id: 0,
            quantidade: 0,
            saida_data: '2000-06-17',
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });
})