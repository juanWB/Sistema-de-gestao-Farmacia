import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { produtoService } from "../../shared/service/api/produtos/ProdutoService";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { FerramentasDeDetalhes } from "../../shared/components";
import { useVFormRef } from "../../shared/forms/useVFormRef";
import { VTextField, VForm } from "../../shared/forms";

interface IProductProps {
    nome: string;
    preco: number;
    validade: Date | string;
    quantidade: number;
    categoria_id: number;
    fornecedor_id: number;
}

export const DetalheDeProduto: React.FC = () => {
    const { id = 'novo' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');
    const { formRef, save, saveAndClose, isSaveAndClose } = useVFormRef();

    useEffect(() => {
        if (id !== 'novo') {

            setIsLoading(true);

            produtoService.getById(Number(id))
                .then(result => {

                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/produtos');
                    } else {
                        setNome(result.nome);
                        console.log(result);
                        formRef.current?.setData(result);
                    }
                })
        } else {
            formRef.current?.setData({
                nome: '',
                preco: '',
                validade: '',
                quantidade: '',
                categoria_id: '',
                fornecedor_id: '',
            });
        }
    }, [id, navigate]);

    const handleDelete = async (id: number) => {
        if (confirm('Realmente deseja deletar o registro?')) {
            try {
                const result = await produtoService.deleteById(id);

                if (result instanceof Error) {
                    return alert(result.message);
                }

                alert('Registro deletado com sucesso!');
                navigate('/produtos');
            } catch (error) {
                console.log(`${(error as { message: string }).message} - Error ao deletar registro`);
                navigate('/produtos');
            }
        }
    }

    const handleSave = async (dados: IProductProps) => {
        if (id === 'novo') {
            try {
                const result = await produtoService.create(dados);

                if (result instanceof Error) {
                    alert("Error ao criar registro")
                } else {
                    if (isSaveAndClose()) {
                        navigate(`/produtos`);

                    } else {
                        navigate(`/produtos/detalhes/${result}`);
                    }
                }

            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const result = await produtoService.updateById(Number(id), dados);

                if (result instanceof Error) {
                    return alert("Error ao criar registro")
                }

                if (isSaveAndClose()) {
                    navigate(`/produtos`);

                } else {
                    navigate(`/produtos/detalhes/${result}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <LayoutBaseDePagina
            titulo={id === 'novo' ? 'Novo produto' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarSalvar={save}
                    aoClicarSalvarEFechar={saveAndClose}
                    aoClicarVoltar={() => navigate('/produtos')}
                    aoClicarApagar={() => handleDelete(Number(id))}
                    aoClicarNovo={() => navigate('/produtos/detalhes/novo')}
                />
            }
        >

            <VForm ref={formRef} onSubmit={(data) => handleSave(data)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Box
                    margin={2}
                    component={Paper}
                    display='flex'
                    flexDirection='column'
                >
                    <Grid container direction='column' padding={2} spacing={2}>

                        {isLoading && (<Grid>
                            <LinearProgress variant="indeterminate" />
                        </Grid>)}

                        <Grid>
                            <Typography variant="h6">
                                Geral
                            </Typography>
                        </Grid>

                        <Grid container direction='row' padding={2} spacing={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                                <VTextField label="Nome" name="nome" disabled={isLoading} onChange={e => setNome(e.target.value)} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                                <VTextField label="Preço" name="preco" disabled={isLoading} onChange={e => setNome(e.target.value)} />
                            </Grid>
                        </Grid>

                        <Grid container direction='row' padding={2} spacing={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                                <VTextField label="DD/MM/AAAA" name="validade" disabled={isLoading} onChange={e => setNome(e.target.value)} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }} >
                                <VTextField label="Quantidade" name="quantidade" disabled={isLoading} onChange={e => setNome(e.target.value)} />
                            </Grid>
                        </Grid>

                        <Grid container direction='row' padding={2} spacing={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                                <VTextField label="Categoria" name="categoria_id" disabled={isLoading} onChange={e => setNome(e.target.value)} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                                <VTextField label="Fornecedor" name="fornecedor_id" disabled={isLoading} onChange={e => setNome(e.target.value)} />
                            </Grid>
                        </Grid>

                    </Grid>



                </Box>

            </VForm>

        </LayoutBaseDePagina>
    )
}