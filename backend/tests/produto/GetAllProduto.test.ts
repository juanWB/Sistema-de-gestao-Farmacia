import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe('GetAll - Produto', () => {
    it('Busca todos produtos com parametros', async() => {
        const res = await serverTest.get('/produto?page=1&limit=10&filter=sabonete');

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    })

    it('Busca todos produtos sem parametros', async() => {
        const res = await serverTest.get('/produto');

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    });

})