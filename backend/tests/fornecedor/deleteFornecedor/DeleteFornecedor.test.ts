import { StatusCodes } from "http-status-codes";
import { serverTest } from "../../jest.setup";


describe('Delete - Fornecedor', () => {
    it('Deleta um fornecedor por um id', async() => {
        const res = await serverTest.delete('/fornecedor/1');

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta deletar um fornecedor por um id composto por letras', async() => {
        const res = await serverTest.delete('/fornecedor/1as');

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta deletar um fornecedor por um id 0', async() => {
        const res = await serverTest.delete('/fornecedor/0');

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta deletar um fornecedor por um id negativo', async() => {
        const res = await serverTest.delete('/fornecedor/-1');

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');

    });

    it('Tenta deletar um fornecedor por um id vazio', async() => {
        const res = await serverTest.delete('/fornecedor/');

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });
})