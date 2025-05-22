import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe('Create - Funcionario', () => {
    it('Cria um funcionario com parametros corretos.', async() => {
        const res = await serverTest.post('/funcionario').send({
            nome: 'Jorge',
            email: 'jorge@email.com',
            senha: '123456aA@'
        });

        expect(res.statusCode).toBe(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta criar um funcionario com senha não segura.', async() => {
        const res = await serverTest.post('/funcionario').send({
            nome: 'Jorge',
            email: 'jorge@email.com',
            senha: '123456'
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta criar um funcionario com nome curto.', async() => {
        const res = await serverTest.post('/funcionario').send({
            nome: 'Jo',
            email: 'jorge@email.com',
            senha: '123456aA@'
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta criar um funcionario com email incompleto.', async() => {
        const res = await serverTest.post('/funcionario').send({
            nome: 'Jorge',
            email: 'jorge@email',
            senha: '123456aA@'
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta criar um funcionario com senha sem letras maiusculas e minusculas.', async() => {
        const res = await serverTest.post('/funcionario').send({
            nome: 'Jorge',
            email: 'jorge@email.com',
            senha: '123456@@@@@'
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });
})