import { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { fornecedorService } from "../../shared/service/api/fornecedores/FornecedorService";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { FerramentasDeDetalhes } from "../../shared/components";
import { VTextField, VForm, useVFormRef } from "../../shared/forms";
import z from "zod";
import { FormValidationFornecedoresSchema, type TFornecedoresProps } from "../../shared/zodSchema";
import { formatCnpj, formatTelefone } from "../../shared/utils/FormatFields";

export const DetalheDeFornecedor: React.FC = () => {
    const { id = 'novo' } = useParams<'id'>();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { formRef, save, saveAndClose, isSaveAndClose } = useVFormRef();

    useEffect(() => {
        if (id !== 'novo') {

            setIsLoading(true);

            fornecedorService.getById(Number(id))
                .then(result => {

                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/fornecedores');
                    } else {
                        setNome(result.nome);
                        console.log(result);
                        formRef.current?.setData({...result, cnpj: formatCnpj(result.cnpj), telefone: formatTelefone(result.telefone)});
                    }
                })
        } else {
            formRef.current?.setData({
                nome: '',
                cnpj: '',
                telefone: '',
                endereco: '',
            });
        }
    }, [id, navigate, formRef]);

    const handleDelete = async (id: number) => {
        if (confirm('Realmente deseja deletar o registro?')) {
            try {
                const result = await fornecedorService.deleteById(id);

                if (result instanceof Error) {
                    return alert(result.message);
                }

                alert('Registro deletado com sucesso!');
                navigate('/fornecedores');
            } catch (error) {
                console.log(`${(error as { message: string }).message} - Error ao deletar registro`);
                navigate('/fornecedores');
            }
        }
    }

    const handleSave = async (dados: TFornecedoresProps) => {
        let dadosValidados: TFornecedoresProps;

        try {
            dadosValidados = FormValidationFornecedoresSchema.parse(dados);

            if (id === 'novo') {
                try {
                    const result = await fornecedorService.create(dadosValidados);

                    if (result instanceof Error) {
                        alert("Error ao criar registro")
                    } else {
                        if (isSaveAndClose()) {
                            navigate(`/fornecedores`);

                        } else {
                            navigate(`/fornecedores/detalhes/${result}`);
                        }
                    }

                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const result = await fornecedorService.updateById(Number(id), dadosValidados!);

                    if (result instanceof Error) {
                        return alert("Error ao criar registro")
                    }

                    if (isSaveAndClose()) {
                        navigate(`/fornecedores`);

                    } else {
                        navigate(`/fornecedores/detalhes/${result}`);
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
            titulo={id === 'novo' ? 'Novo fornecedore' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarSalvar={save}
                    aoClicarSalvarEFechar={saveAndClose}
                    aoClicarVoltar={() => navigate('/fornecedores')}
                    aoClicarApagar={() => handleDelete(Number(id))}
                    aoClicarNovo={() => navigate('/fornecedores/detalhes/novo')}
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
                                <VTextField label="CNPJ" name="cnpj" disabled={isLoading} />
                            </Grid>
                        </Grid>

                        <Grid container direction='row' padding={2} spacing={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                                <VTextField label="Telefone" name="telefone" disabled={isLoading} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }} >
                                <VTextField label="Endereço" name="endereco" disabled={isLoading} />
                            </Grid>
                        </Grid>

                    </Grid>

                </Box>

            </VForm>

        </LayoutBaseDePagina>
    )
}