import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";

import { FerramentasDeDetalhes } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { produtoService } from "../../shared/service/api/produtos/ProdutoService";
import { Form } from "@unform/web";
import { VTextField } from "../../shared/forms";

export const DetalheDeProduto: React.FC = () => {
    const { id = 'novo'} = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading ] = useState(false);
    const [nome, setNome] = useState('');

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
    
    const handleSave = () =>{
        console.log('Save');
    }

    return(
        <LayoutBaseDePagina 
            titulo={id === 'novo' ? 'Novo produto' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarSalvar={handleSave}
                    aoClicarSalvarEFechar={handleSave}
                    aoClicarVoltar={() => navigate('/produtos')}
                    aoClicarApagar={() => handleDelete(Number(id))}
                    aoClicarNovo={() => navigate('/produtos/detalhes/novo')}
                />
            }
        >  

            <Form 
                onSubmit={(data) => console.log(data)}
            >

                <VTextField
                    name="nome"
                />

            </Form>

        </LayoutBaseDePagina>
    )
}