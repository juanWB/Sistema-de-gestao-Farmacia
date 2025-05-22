import { StatusCodes } from "http-status-codes";
import { serverTest } from "../../jest.setup";


describe('Update - Fornecedor', () => {
    it('Atualiza um fornecedor por um id', async() => {
        const res = await serverTest.put('/fornecedor/1').send({
            nome: 'Atacamax',
            cnpj: '12345678912345',
            telefone: '81998837891',
            endereco: 'Rua 1'
        })

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
    });
    
    it('Tenta atualizar um fornecedor por um id composto por letras', async() => {
        const res = await serverTest.put('/fornecedor/1as').send({
            nome: 'Atacamax',
            cnpj: '12345678912345',
            telefone: '81998837891',
            endereco: 'Rua 1'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar um fornecedor por um id 0', async() => {
        const res = await serverTest.put('/fornecedor/0').send({
            nome: 'Atacamax',
            cnpj: '12345678912345',
            telefone: '81998837891',
            endereco: 'Rua 1'
        })  

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar um fornecedor por um id negativo', async() => {
        const res = await serverTest.put('/fornecedor/-1').send({
            nome: 'Atacamax',
            cnpj: '12345678912345',
            telefone: '81998837891',
            endereco: 'Rua 1'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');    
    });
    
    it('Tenta atualizar um fornecedor com nome curto', async() => {
        const res = await serverTest.put('/fornecedor/1').send({
            nome: 'At',
            cnpj: '12345678912345',
            telefone: '81998837891',
            endereco: 'Rua 1'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

    it('Tenta atualizar um fornecedor com telefone curto', async() => {
        const res = await serverTest.put('/fornecedor/1').send({
            nome: 'Atacamax',
            cnpj: '12345678912345',
            telefone: '819',
            endereco: 'Rua 1'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });     

    it('Tenta atualizar um fornecedor com campos inválidos	', async() => {
        const res = await serverTest.put('/fornecedor/1').send({
            nome: 'At',
            cnpj: '123456',
            telefone: '8assd',
            endereco: 'R'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });
});

