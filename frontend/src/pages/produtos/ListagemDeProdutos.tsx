import { useSearchParams } from "react-router-dom"
import { FerramentasDeListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { useState, useEffect } from "react";
import { produtoService } from "../../shared/service/api/produtos/ProdutoService";
import { useDebounce } from "../../shared/hooks/UseDebounce";


export const ListagemDeProdutos: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const buscaParam = searchParams.get('busca') || '';
    const [busca, setBusca] = useState(buscaParam);

    const { debounce } = useDebounce();

    const handleBuscaChange = (novoTexto: string) => {
        setBusca(novoTexto);
        setSearchParams({ busca: novoTexto }, { replace: true });
    }

    useEffect(() => {
        debounce(() => {
            produtoService.getAll(1, busca)
                .then((result) => {
                    if (result instanceof Error) {
                        alert("Erro de conexão");
                        return
                    } else {
                        console.log(result);
                    }
                })
        })
    }, [busca])

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