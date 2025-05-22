import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";


describe('Update - Funcionario', () => {
    it('Atualiza um funcionario por um id', async() => {
        const res = await serverTest.put('/funcionario/1').send({
            nome: 'Jorge',
            email: 'jorge@email.com',
            senha: '123456aA@'
        });

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar um funcionario por um id composto por letras', async() => {
        const res = await serverTest.put('/funcionario/1as').send({
            nome: 'Jorge',
            email: 'jorge@email.com',
            senha: '123456aA@'
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar um funcionario por um id 0', async() => {
        const res = await serverTest.put('/funcionario/0').send({
            nome: 'Jorge',
            email: 'jorge@email.com',
            senha: '123456aA@'
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar um funcionario por um id negativo', async() => {
        const res = await serverTest.put('/funcionario/-1').send({
            nome: 'Jorge',
            email: 'jorge@email.com',
            senha: '123456aA@'
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar um funcionario com nome curto', async() => {
        const res = await serverTest.put('/funcionario/1').send({
            nome: 'Jo',
            email: 'jorge@email.com',
            senha: '123456aA@'
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar um funcionario com email incompleto.', async() => {
        const res = await serverTest.put('/funcionario/1').send({
            nome: 'Jorge',
            email: 'jorge@email',
            senha: '123456aA@'
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar um funcionario com senha sem letras maiusculas e minusculas.', async() => {
        const res = await serverTest.put('/funcionario/1').send({
            nome: 'Jorge',
            email: 'jorge@email.com',
            senha: '123456@@@@@'
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    }); 
})