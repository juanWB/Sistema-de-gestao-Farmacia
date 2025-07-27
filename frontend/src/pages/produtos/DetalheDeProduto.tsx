import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import type { FormHandles } from "@unform/core";
import { VTextField } from "../../shared/forms";
import { Form } from "@unform/web";

import { produtoService } from "../../shared/service/api/produtos/ProdutoService";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { FerramentasDeDetalhes } from "../../shared/components";

interface IProductProps {
    nome: string;
    preco: number;
    validade: Date | string;
    quantidade: number;
    categoria_id: number;
    fornecedor_id: number;
}

export const DetalheDeProduto: React.FC = () => {
    const { id = 'novo'} = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading ] = useState(false);
    const [nome, setNome] = useState('');
    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        if(id !== 'novo'){
           
            setIsLoading(true);

            produtoService.getById(Number(id))
                .then(result => {
                    
                    setIsLoading(false);

                    if(result instanceof Error){
                        alert(result.message);
                        navigate('/produtos');
                    }else{
                        setNome(result.nome);
                        console.log(result);
                    }
                })
        } 
    },[id]);

    const handleDelete = async(id: number) => {
        if(confirm('Realmente deseja deletar o registro?')){
            try{
                const result = await produtoService.deleteById(id);

                 if(result instanceof Error){
                    return alert(result.message);
                 }

                 alert('Registro deletado com sucesso!');
                 navigate('/produtos');
            }catch(error){
                console.log(`${(error as {message: string}).message} - Error ao deletar registro`); 
                navigate('/produtos');
            }
        }
    }
    
    const handleSave = (dados: IProductProps) =>{
        console.log(dados);
    }

    return(
        <LayoutBaseDePagina 
            titulo={id === 'novo' ? 'Novo produto' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarSalvar={() => formRef.current?.submitForm()}
                    aoClicarSalvarEFechar={() => formRef.current?.submitForm()}
                    aoClicarVoltar={() => navigate('/produtos')}
                    aoClicarApagar={() => handleDelete(Number(id))}
                    aoClicarNovo={() => navigate('/produtos/detalhes/novo')}
                />
            }
        >  

            <Form 
                onSubmit={(data) => handleSave(data)}
            >

                <VTextField name="nome"/>
                <VTextField name="preco"/>
                <VTextField name="validade"/>
                <VTextField name="quantidade"/>
                <VTextField name="categoria_id"/>
                <VTextField name="fornecedor_id"/>

            </Form>

        </LayoutBaseDePagina>
    )
}