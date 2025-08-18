import z from "zod";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { FerramentasDeDetalhes } from "../../shared/components";
import { VTextField, VForm, useVFormRef } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { AutoCompleteFornecedores, AutoCompleteCategorias } from "./component";
import { FormValidationProdutosSchema , type TProductProps } from "../../shared/zodSchema";
import { produtoService } from "../../shared/service/api/produtos/ProdutoService";
import { VDatePicker } from "../../shared/forms/VDatePicker";
import { formatDate } from "../../shared/utils/FormatFields";

export const DetalheDeProduto: React.FC = () => {
    const navigate = useNavigate();
    const { id = 'novo' } = useParams<{id: string}>();

    const [nome, setNome] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
                categoria_id: undefined,
                fornecedor_id: undefined,
            });
        }
    }, [id]);

    const handleDelete = async (idParam: string) => {
         const productId = Number(idParam);
            if (isNaN(productId)) {
                alert('ID do produto inválido');
                return;
            }

        if (confirm('Realmente deseja deletar o registro?')) {
            try {
                const result = await produtoService.deleteById(productId);

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

    const handleSave = async (dados: TProductProps) => {
        let dadosValidados: TProductProps;
        const formatedDate = formatDate(dados.validade);
        console.log(formatedDate);
        try {
            dadosValidados = FormValidationProdutosSchema.parse({ ...dados, validade: formatedDate });

            if (id === 'novo') {
                try {
                    console.log(dadosValidados.validade + ' detalhe produto')
                    const result = await produtoService.create(dadosValidados);

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
                   console.log(formatedDate);
                   const result = await produtoService.updateById(Number(id), dadosValidados);

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

        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorValidation: Record<string, string> = {};
                error.errors.map((err) => {
                    errorValidation[err.path.toString()] = err.message;
                });
                console.log(errorValidation);
                formRef.current?.setErrors(errorValidation);
            }
        }
    }

    return (
        <LayoutBaseDePagina
            titulo={id === 'novo' ? 'Novo produto' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'novo'}
                    mostrarBotaoApagar={id !== 'novo'}

                    aoClicarSalvar={save}
                    aoClicarSalvarEFechar={saveAndClose}
                    aoClicarVoltar={() => navigate('/produtos')}
                    aoClicarApagar={() => handleDelete(id)}
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
                                <VTextField label="Preço" name="preco" disabled={isLoading} />
                            </Grid>
                        </Grid>

                        <Grid container direction='row' padding={2} spacing={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 1.9 }}>
                                <AutoCompleteCategorias isExternalLoading={isLoading} />
                            </Grid>
                            <Grid marginLeft={1.5} size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 1.9 }}>
                                <AutoCompleteFornecedores isExternalLoading={isLoading} />
                            </Grid>
                        </Grid>

                        <Grid container direction='row' padding={2} spacing={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                                <VDatePicker label="Validade" name="validade" disabled={isLoading}/>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }} >
                                <VTextField label="Quantidade" name="quantidade" disabled={isLoading} />
                            </Grid>
                        </Grid>


                    </Grid>



                </Box>

            </VForm>

        </LayoutBaseDePagina>
    )
}