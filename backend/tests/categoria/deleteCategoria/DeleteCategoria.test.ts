import { StatusCodes } from "http-status-codes";
import { serverTest } from "../../jest.setup"


describe('Delete - Categorias', () => {
    it('Deleta uma categoria por um id', async() => {
        const res = await serverTest.delete('/categorias/1');

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta deletar uma categoria por um id composto por letras', async() => {
        const res = await serverTest.delete('/categorias/1as');

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta deletar uma categoria por um id 0', async() => {
        const res = await serverTest.delete('/categorias/0');

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta deletar uma categoria por um id negativo', async() => {
        const res = await serverTest.delete('/categorias/-1');

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    })
})