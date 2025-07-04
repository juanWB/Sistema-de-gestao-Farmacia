import { useSearchParams } from "react-router-dom"
import { FerramentasDeListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { useState } from "react";


export const ListagemDeProdutos: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const buscaParam = searchParams.get('busca') || '';
    const [busca, setBusca] = useState(buscaParam);

    const handleBuscaChange = (novoTexto: string) => {
        setBusca(novoTexto);
        setSearchParams({ busca: novoTexto }, { replace: true });
    }
    return (
        <LayoutBaseDePagina
            titulo="Produtos"
            barraDeFerramentas={
                <FerramentasDeListagem
                    mostrarCampoBusca
                    mostrarButton
                    textoCampoBusca={busca}
                    aoMudarTextoDeBusca={handleBuscaChange}
                />
            }
        >


        </LayoutBaseDePagina>
    )
}