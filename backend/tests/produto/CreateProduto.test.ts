import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe('Create - Produto', () => {
    it('Cria um produto com parametros corretos.', async() => {
        const res = await serverTest.post('/produto').send({
            nome: 'Sabonete',
            preco: '1.99',
            validade: '2025-01-01',
            quantidade: '100',
            categoria_id: 1,
            fornecedor_id: 1
        });

        expect(res.statusCode).toBe(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta criar um produto com nome curto.', async() => {
        const res = await serverTest.post('/produto').send({
            nome: 'S',
            preco: '1.99',
            validade: '2025-01-01',
            quantidade: '100',
            categoria_id: 1,
            fornecedor_id: 1
        }); 

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta criar um produto com preco negativo.', async() => {
        const res = await serverTest.post('/produto').send({
            nome: 'Sabonete',
            preco: '-1.99',
            validade: '2025-01-01',
            quantidade: '100',
            categoria_id: 1,
            fornecedor_id: 1
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta criar um produto com quantidade negativa.', async() => {
        const res = await serverTest.post('/produto').send({
            nome: 'Sabonete',
            preco: '1.99',
            validade: '2025-01-01',
            quantidade: '-100',
            categoria_id: 1,
            fornecedor_id: 1
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta criar um produto com categoria 0.', async() => {
        const res = await serverTest.post('/produto').send({
            nome: 'Sabonete',
            preco: '1.99',
            validade: '2025-01-01',
            quantidade: '100',
            categoria_id: 0,
            fornecedor_id: 1
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    }); 

    it('Tenta criar um produto com fornecedor 0.', async() => {
        const res = await serverTest.post('/produto').send({
            nome: 'Sabonete',
            preco: '1.99',
            validade: '2025-01-01',
            quantidade: '100',
            categoria_id: 1,
            fornecedor_id: 0
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta criar um produto com categoria e fornecedor 0.', async() => {
        const res = await serverTest.post('/produto').send({
            nome: 'Sabonete',
            preco: '1.99',
            validade: '2025-01-01',
            quantidade: '100',
            categoria_id: 0,
            fornecedor_id: 0
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');    
    });

    it('Tenta criar um produto com categoria e fornecedor letras.', async() => {
        const res = await serverTest.post('/produto').send({
            nome: 'Sabonete',
            preco: '1.99',
            validade: '2025-01-01',
            quantidade: '100',
            categoria_id: 'a',
            fornecedor_id: 'a'
        }); 

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta criar um produto com categoria e fornecedor negativos.', async() => {
        const res = await serverTest.post('/produto').send({
            nome: 'Sabonete',
            preco: '1.99',
            validade: '2025-01-01',
            quantidade: '100',
            categoria_id: '-1',
            fornecedor_id: '-1'
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });
});