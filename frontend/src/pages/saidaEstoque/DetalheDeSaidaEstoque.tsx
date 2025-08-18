import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import z from "zod";

import { formValidationEntradaSchema as formValidationSaidaSchema, type TEntradaEstoqueProps as TSaidaEstoqueProps } from "../../shared/zodSchema";
import { saidaService } from "../../shared/service/api/saidaEstoque/SaidaService";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { AutoCompleteProdutos } from "../entradaEstoque/component/AutoCompleteProdutos";
import { VTextField, VForm, useVFormRef } from "../../shared/forms";
import { FerramentasDeDetalhes } from "../../shared/components";

export const DetalheDeSaidaEstoque: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const { formRef, save, saveAndClose, isSaveAndClose } = useVFormRef();

    useEffect(() => {
        if (id !== 'nova') {
            const ValidId = Number(id);
            setIsLoading(true);

            saidaService.getById(Number(ValidId))
                .then(result => {

                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/saidas');
                    } else {
                        console.log(result);
                        formRef.current?.setData(result);
                    }
                })
        } else {
            formRef.current?.setData({
                produto_id: undefined,
                quantidade: ''
            });
        }
    }, [id, navigate, formRef]);

    const handleDelete = async (id: number) => {
        if (confirm('Realmente deseja deletar o registro?')) {
            try {
                const result = await saidaService.deleteById(id);

                if (result instanceof Error) {
                    return alert(result.message);
                }

                alert('Registro deletado com sucesso!');
                navigate('/saidas');
            } catch (error) {
                console.log(`${(error as { message: string }).message} - Error ao deletar registro`);
                navigate('/saidas');
            }
        }
    }

    const handleSave = (dados: TSaidaEstoqueProps) => {
    let dadosValidados: TSaidaEstoqueProps;

    try {
        dadosValidados = formValidationSaidaSchema.parse(dados);

        if (id === 'nova') {
            saidaService.create(dadosValidados)
                .then(result => {
                    if (result instanceof Error) {
                        alert("Erro ao criar registro");
                        return;
                    } else if (isSaveAndClose()) {
                        navigate(`/saidas`);
                    } else if( typeof result === 'number'){
                        navigate(`/saidas/detalhes/${result}`);
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        } else {
            const idNumber = Number(id);
            saidaService.updateById(idNumber, dadosValidados)
                .then(result => {
                    if (result instanceof Error) {
                        alert("Erro ao atualizar registro");
                        return;
                    } else if (isSaveAndClose()) {
                        navigate(`/saidas`);
                    } else {
                        navigate(`/saidas/detalhes/${idNumber}`);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorValidation: Record<string, string> = {};
            error.errors.forEach(err => {
                errorValidation[err.path.toString()] = err.message;
            });
            console.log(errorValidation);
            formRef.current?.setErrors(errorValidation);
        }
    }
}


    return (
        <LayoutBaseDePagina
            titulo={'Saidas no estoque'}
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarSalvar={save}
                    aoClicarSalvarEFechar={saveAndClose}
                    aoClicarVoltar={() => navigate('/saidas')}
                    aoClicarApagar={() => handleDelete(Number(id))}
                    aoClicarNovo={() => navigate('/saidas/detalhes/nova')}
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
                                <AutoCompleteProdutos isExternalLoading={isLoading} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                                <VTextField label="Quantidade" name="quantidade" disabled={isLoading} />
                            </Grid>
                        </Grid>

                    </Grid>

                </Box>

            </VForm>

        </LayoutBaseDePagina>
    )
}