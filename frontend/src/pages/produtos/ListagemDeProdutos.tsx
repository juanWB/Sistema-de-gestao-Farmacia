import { useSearchParams } from "react-router-dom"
import { useState, useEffect, useMemo } from "react";

import { produtoService, type IListagemProduto } from "../../shared/service/api/produtos/ProdutoService";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { FerramentasDeListagem } from "../../shared/components"
import { useDebounce } from "../../shared/hooks/UseDebounce";
import { CircularProgress, LinearProgress, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { Enviroments } from "../../shared/enviroments";


export const ListagemDeProdutos: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const buscaParam = searchParams.get('busca') || '';
    const [busca, setBusca] = useState(buscaParam);

    const [rows, setRows] = useState<IListagemProduto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const { debounce } = useDebounce();

    const handleBuscaChange = (novoTexto: string) => {
        setBusca(novoTexto);
        setSearchParams({ busca: novoTexto }, { replace: true });
    }

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || 1);
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true)

        debounce(() => {

            produtoService.getAll(pagina, busca)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert("Erro de conexão");
                        return
                    } else {
                        console.log(result);
                        setRows(result.data);
                        setTotalCount(result.totalCount);
                    }
                });
        });
    }, [busca, pagina, debounce]);

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

            {isLoading && rows.length === 0 ? (
                <Stack
                    margin={30}
                    spacing={4}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'} >
                    <CircularProgress size={60} />
                </Stack>
            ) : (
                <TableContainer component={Paper} variant="outlined" sx={{ m: 2, width: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ações</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Preço</TableCell>
                                <TableCell>Quantidade</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>Ações</TableCell>
                                    <TableCell>{row.nome}</TableCell>
                                    <TableCell>{row.preco}</TableCell>
                                    <TableCell>{row.quantidade}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                        
                        {totalCount === 0 && !isLoading && (
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <Typography
                                            fontSize={15}
                                            variant="caption"
                                        >
                                            {Enviroments.LISTAGEM_VAZIA}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        )}

                    <TableFooter>
                        {isLoading && rows.length > 0 && (
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <LinearProgress variant="indeterminate"/>
                                    </TableCell>
                                </TableRow>
                        )}

                         {(totalCount > 0 && Enviroments.LIMITE_DE_LINHAS) && (
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <Pagination
                                            onChange={(_, newPage) => setSearchParams({busca, page: newPage.toString()}, {replace: true})}
                                            count={Math.ceil(totalCount / Enviroments.LIMITE_DE_LINHAS)}
                                            page={pagina}
                                        />
                                    </TableCell>
                                </TableRow>
                        )}
                    </TableFooter>

                    </Table>
                </TableContainer>
            )}

        </LayoutBaseDePagina>
    )
}