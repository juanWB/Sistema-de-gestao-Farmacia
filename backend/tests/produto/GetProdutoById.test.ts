import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe('GetById - Produto', () => {
    it('Busca um produto por um id', async() => {
        const res = await serverTest.get('/produto/1');
        expect(res.status).toBe(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta buscar um produto por um id composto por letras', async() => {
        const res = await serverTest.get('/produto/1as');
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta buscar um produto por um id 0', async() => {
        const res = await serverTest.get('/produto/0');
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta buscar um produto por um id negativo', async() => {
        const res = await serverTest.get('/produto/-1');
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });
})