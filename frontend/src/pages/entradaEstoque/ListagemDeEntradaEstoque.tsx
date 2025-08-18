import { useNavigate, useSearchParams } from "react-router-dom"
import { useState, useEffect, useMemo } from "react";

import { CircularProgress, IconButton, LinearProgress, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { entradaService, type IListagemEntrada } from "../../shared/service/api/entradaEstoque/EntradaService";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { FerramentasDeListagem } from "../../shared/components"
import { useDebounce } from "../../shared/hooks/UseDebounce";
import { Enviroments } from "../../shared/enviroments";
import { Delete, Edit } from "@mui/icons-material";


export const ListagemDeEntradasEstoque: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const buscaParam = searchParams.get('busca') || '';
    const [busca, setBusca] = useState(buscaParam);

    const [rows, setRows] = useState<IListagemEntrada[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const navigate = useNavigate();

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

            entradaService.getAll(pagina, busca)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert("Erro de conexão");
                        return
                    } else {
                        console.log(result);
                        setRows([result.data]);
                        setTotalCount(result.totalCount);
                    }
                });
        });
    }, [busca, pagina, debounce]);

    const handleDelete = async(id: number) => {
        if(confirm('Realmente deseja deletar o registro?')){
            try{
                const result = await entradaService.deleteById(id);

                 if(result instanceof Error){
                    return alert(result.message);
                 }

                 setRows(oldRows => {
                   return [...oldRows].filter(rows => rows.id !== id)
                 });
                 alert('Registro deletado com sucesso!');
            }catch(error){
                console.log(`${(error as {message: string}).message} - Error ao deletar registro`);
            }
        }
    }

    return (
        <LayoutBaseDePagina
            titulo="Entradas"
            barraDeFerramentas={
                <FerramentasDeListagem
                    mostrarCampoBusca
                    mostrarButton
                    textoCampoBusca={busca}
                    aoClicarEmNovo={() => navigate('/entradas/detalhes/nova')}
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
                                <TableCell>Produto</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Quantidade</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <IconButton onClick={() => handleDelete(row.id)}>
                                            <Delete/>
                                        </IconButton>
                                        <IconButton onClick={() => navigate(`/entradas/detalhes/${row.id}`)}>
                                            <Edit/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{row.produto_id}</TableCell>
                                    <TableCell>{''}</TableCell>
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