import { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { FerramentasDeDetalhes } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { produtoService } from "../../shared/service/api/produtos/ProdutoService";
import { fornecedorService } from "../../shared/service/api/fornecedores/FornecedorService";
import { entradaService } from "../../shared/service/api/entradaEstoque/EntradaService";
import { saidaService } from "../../shared/service/api/saidaEstoque/SaidaService";


export const Dashboard = () => {
    const [isLoadingFornecedores, setIsLoadingFornecedores] = useState(false);
    const [totalCountFornecedores, setTotalCountFornecedores] = useState(0);

    const [isLoadingProdutos, setIsLoadingProdutos] = useState(false);
    const [totalCountProdutos, setTotalCountProdutos] = useState(0);

    const [isLoadingEntrada, setIsLoadingEntrada] = useState(false);
    const [totalCountEntrada, setTotalCountEntrada] = useState(0);

    const [isLoadingSaida, setIsLoadingSaida] = useState(false);
    const [totalCountSaida, setTotalCountSaida] = useState(0);

    useEffect(() => {
        setIsLoadingFornecedores(true);
        setIsLoadingProdutos(true);
        setIsLoadingEntrada(true);
        setIsLoadingSaida(true);

        fornecedorService.getAll(1).then((result) => {
            setIsLoadingFornecedores(false);
            if (result instanceof Error) {
                alert(result.message)
            } else {
                setTotalCountFornecedores(result.totalCount);
            }
        });

        produtoService.getAll(1).then((result) => {
            setIsLoadingProdutos(false);
            if (result instanceof Error) {
                alert(result.message)
            } else {
                setTotalCountProdutos(result.totalCount);
            }
        });

        entradaService.getAll(1).then((result) => {
            setIsLoadingEntrada(false);
            if (result instanceof Error) {
                alert(result.message)
            } else {
                setTotalCountEntrada(result.totalCount);
            }
        });

        saidaService.getAll(1).then((result) => {
            setIsLoadingSaida(false);
            if (result instanceof Error) {
                alert(result.message)
            } else {
                setTotalCountSaida(result.totalCount);
            }
        });

    }, []);

    return (
        <LayoutBaseDePagina
            titulo="Página inicial"
            barraDeFerramentas={<FerramentasDeDetalhes mostrarBotaoNovo={false} mostrarBotaoSalvar={false} mostrarBotaoVoltar={false} mostrarBotaoApagar={false} />} >

            <Box width='100%' display='flex'>
                <Grid container width='100%' spacing={2} margin={1.5}>

                    <Grid size={{ xs: 12, sm: 12, md: 7, lg: 5, xl: 3 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" align='center'>
                                    Total de produtos
                                </Typography>

                                <Box padding={4} textAlign='center'>
                                    {!isLoadingProdutos ? (<Typography variant="h2">
                                        {totalCountProdutos}
                                    </Typography>) : (
                                        <Typography variant="h4">
                                            Carregando...
                                        </Typography>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12, md: 7, lg: 5, xl: 3 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" align='center'>
                                    Total de fornecedores
                                </Typography>

                                <Box padding={4} textAlign='center'>
                                    {!isLoadingFornecedores ? (<Typography variant="h2">
                                        {totalCountFornecedores}
                                    </Typography>) : (
                                        <Typography variant="h4">
                                            Carregando...
                                        </Typography>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12, md: 7, lg: 5, xl: 3 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" align='center'>
                                    Total de saidas
                                </Typography>

                                <Box padding={4} textAlign='center'>
                                    {!isLoadingSaida ? (<Typography variant="h2">
                                        {totalCountSaida}
                                    </Typography>) : (
                                        <Typography variant="h4">
                                            Carregando...
                                        </Typography>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12, md: 7, lg: 5, xl: 3 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" align='center'>
                                    Total de entradas
                                </Typography>

                                <Box padding={4} textAlign='center'>
                                    {!isLoadingEntrada ? (<Typography variant="h2">
                                        {totalCountEntrada}
                                    </Typography>) : (
                                        <Typography variant="h4">
                                            Carregando...
                                        </Typography>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>

            </Box>

        </LayoutBaseDePagina>
    );
}