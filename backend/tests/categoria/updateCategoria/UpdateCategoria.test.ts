import { StatusCodes } from "http-status-codes";
import { serverTest } from "../../jest.setup"


describe('Update - Categorias', () => {
    it('Atualiza uma categoria com parametros corretos', async() => {
        const res = await serverTest.put('/categorias/1').send({
            nome: 'Medicamento'
        });

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar uma categoria com id com letras e nome correto', async() => {
        const res = await serverTest.put('/categorias/1asa').send({
            nome: 'Medicamento'
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar uma categoria com id correto e nome curto', async() => {
        const res = await serverTest.put('/categorias/1asa').send({
            nome: 'Me'
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar uma categoria com id correto e nome composto por numeros', async() => {
        const res = await serverTest.put('/categorias/1asa').send({
            nome: '123'
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar uma categoria com id menor que 1 e nome correto', async() => {
        const res = await serverTest.put('/categorias/0').send({
            nome: 'Medicamento'
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar uma categoria com id igual a 0 e nome correto', async() => {
        const res = await serverTest.put('/categorias/1asa').send({
            nome: 'Medicamento'
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    })
})