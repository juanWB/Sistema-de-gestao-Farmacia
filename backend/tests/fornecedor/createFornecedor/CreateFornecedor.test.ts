import { StatusCodes } from "http-status-codes"
import { serverTest } from "../../jest.setup"


describe('Create- Fornecedor', () => {
    it("Cria um fornecedor com parametros corretos.", async() => {
        const res = await serverTest.post('/fornecedor').send({
            nome: 'Atacamax',
            cnpj: '12345678912345',
            telefone: '81998837891',
            endereco: 'Rua 1'
        })


        expect(res.statusCode).toBe(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('object');
    });

    it("Cria um fornecedor com parametros corretos com caracteres especiais.", async() => {
        const res = await serverTest.post('/fornecedor').send({
            nome: 'Atacamax',
            cnpj: '12.345.678/9123-45',
            telefone: '(81) - 998837891',
            endereco: 'Rua 1'
        })

        expect(res.statusCode).toBe(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('object');
    });

    it("Tenta criar um fornecedor com parametros incorretos.", async() => {
        const res = await serverTest.post('/fornecedor').send({
            nome: '1245',
            cnpj: 'aaaaaaa',
            telefone: 'aaaaaaaaa',
            endereco: '4515'
        })

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

        it("Tenta criar um fornecedor com cnpj incorreto.", async() => {
        const res = await serverTest.post('/fornecedor').send({
            nome: 'Atacamax',
            cnpj: 'aaaaaaa',
            telefone: '81998837891',
            endereco: 'Rua 1'
        })

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });

      it("Tenta criar um fornecedor com nome curto.", async() => {
        const res = await serverTest.post('/fornecedor').send({
            nome: 'At',
            cnpj: '12345678912345',
            telefone: '81998837891',
            endereco: 'Rua 1'
        })

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });
    
    it("Tenta criar um fornecedor com telefone curto.", async() => {
        const res = await serverTest.post('/fornecedor').send({
            nome: 'Atacamax',
            cnpj: '12345678912345',
            telefone: '8199883',
            endereco: 'Rua 1'
        })

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(typeof res.body).toEqual('object');
    });
})