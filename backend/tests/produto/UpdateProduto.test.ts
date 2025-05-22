import { StatusCodes } from "http-status-codes";
import { serverTest } from "../jest.setup";

describe('Update - Produto', () => {
    it('Atualiza um produto por um id', async() => {
        const res = await serverTest.put('/produto/1').send({
            nome: 'Sabonete',
            preco: '1.99',
            validade: '2025-01-01',
            quantidade: '100',
            categoria_id: 1,
            fornecedor_id: 1
        });

        expect(res.statusCode).toBe(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar um produto por um id composto por letras', async() => {
        const res = await serverTest.put('/produto/1as').send({
            nome: 'Sabonete',
            preco: '1.99',
            validade: '2025-01-01',
            quantidade: '100',
            categoria_id: 1,
            fornecedor_id: 1
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar um produto por um id 0', async() => {
        const res = await serverTest.put('/produto/0').send({
            nome: 'Sabonete',
            preco: '1.99',
            validade: '2025-01-01',
            quantidade: '100',
            categoria_id: 1,
            fornecedor_id: 1
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar um produto por um id negativo', async() => {
        const res = await serverTest.put('/produto/-1').send({
            nome: 'Sabonete',
            preco: '1.99',
            validade: '2025-01-01',
            quantidade: '100',
            categoria_id: 1,
            fornecedor_id: 1
        });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    }); 

    it('Tenta atualizar um produto com quantidade negativa.', async() => {
        const res = await serverTest.put('/produto/1').send({
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

    it('Tenta atualizar um produto com categoria 0.', async() => {
        const res = await serverTest.put('/produto/1').send({
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

    it('Tenta atualizar um produto com fornecedor 0.', async() => {
        const res = await serverTest.put('/produto/1').send({
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

    it('Tenta atualizar um produto com preco negativo.', async() => {
        const res = await serverTest.put('/produto/1').send({
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

   it('Tenta atualizar um produto com nome vazio.', async() => {
       const res = await serverTest.put('/produto/1').send({
           nome: '',
           preco: '1.99',
           validade: '2025-01-01',
           quantidade: '100',
           categoria_id: 1,
           fornecedor_id: 1
       });
 
       expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
       expect(typeof res.body).toEqual('object');
   });

});