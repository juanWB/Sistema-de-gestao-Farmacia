import { useNavigate, useParams } from "react-router-dom"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { FerramentasDeDetalhes } from "../../shared/components";


export const DetalheDeProduto: React.FC = () => {
    const { id = 'novo'} = useParams<'id'>();
    const navigate = useNavigate();

    const handleDelete = () =>{
        console.log('Delete');
    }
    
    const handleSave = () =>{
        console.log('Save');
    }

    return(
        <LayoutBaseDePagina 
            titulo="Detalhes de produto"
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarSalvar={handleSave}
                    aoClicarSalvarEFechar={handleSave}
                    aoClicarVoltar={() => navigate('/produtos')}
                    aoClicarApagar={handleDelete}
                    aoClicarNovo={() => navigate('/produtos/detalhes/novo')}
                />
            }
        >
                    <p>DetalheDeProduto: {id}</p>
        </LayoutBaseDePagina>
    )
}