import { StatusCodes } from "http-status-codes"
import { serverTest } from "../../jest.setup"


describe('Create - Categoria', () => {
    it('Cria categoria com o nome correto', async() => {
        const res = await serverTest.post('/categorias').send({
            nome: 'Medicamentos'
        })

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('object');
    });

     it('Tenta categoria com nome curto', async() => {
        const res = await serverTest.post('/categorias').send({
            nome: 'Me'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

     it('Cria categoria com nome composto por numeros', async() => {
        const res = await serverTest.post('/categorias').send({
            nome: '123'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

     it('Cria categoria sem campo nome', async() => {
        const res = await serverTest.post('/categorias').send({
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    })
})