import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";


describe('Delete - Produto', () => {
    it('Deleta um produto por um id', async() => {
        const res = await serverTest.delete('/produto/1');

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta deletar um produto por um id composto por letras', async() => {
        const res = await serverTest.delete('/produto/1as');

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta deletar um produto por um id 0', async() => {
        const res = await serverTest.delete('/produto/0');

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta deletar um produto por um id negativo', async() => {
        const res = await serverTest.delete('/produto/-1');

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });
})