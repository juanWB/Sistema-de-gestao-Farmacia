import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";

import { entradaService } from "../../shared/service/api/entradaEstoque/EntradaService";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { VTextField, VForm, useVFormRef } from "../../shared/forms";
import { FerramentasDeDetalhes } from "../../shared/components";
import z from "zod";

const formValidationSchema = z.object({
        produto_id: z.coerce.number({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).positive('O id precisar ser maior do que 0.').int('O id precisar ser um inteiro.'),
        quantidade: z.coerce.number({
                required_error: 'Campo obrigatório.',
                invalid_type_error: 'Campo obrigatório'
            })
            .nonnegative('O campo quantidade não pode ser menor que 0')
            .int('O campo quantidade precisar ser um inteiro.'),
        entrada_data:z.string({
                required_error: 'Campo obrigatório.',
                invalid_type_error: 'Campo obrigatório'
            })
            .nonempty('Campo obrigatório')
            .regex(/^\d{2}-\d{2}-\d{4}$/, 'O formato deve ser YYYY-MM-DD')
            .transform((str) => new Date(str))
            .refine((date) => !isNaN(date.getTime()), { message: 'Data inválida' }), 
});

type TEntradaEstoqueProps = z.infer<typeof formValidationSchema>;

export const DetalheDeProduto: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const { formRef, save, saveAndClose, isSaveAndClose } = useVFormRef();

    useEffect(() => {
        if (id !== 'nova') {

            setIsLoading(true);

            entradaService.getById(Number(id))
                .then(result => {

                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/entradas');
                    } else {
                        console.log(result);
                        formRef.current?.setData(result);
                    }
                })
        } else {
            formRef.current?.setData({
                produto_id: undefined,
                entrada_data: '',
                quantidade: ''
            });
        }
    }, [id, navigate, formRef]);

    const handleDelete = async (id: number) => {
        if (confirm('Realmente deseja deletar o registro?')) {
            try {
                const result = await entradaService.deleteById(id);

                if (result instanceof Error) {
                    return alert(result.message);
                }

                alert('Registro deletado com sucesso!');
                navigate('/entradas');
            } catch (error) {
                console.log(`${(error as { message: string }).message} - Error ao deletar registro`);
                navigate('/entradas');
            }
        }
    }

    const handleSave = async (dados: TEntradaEstoqueProps) => {
        let dadosValidados: TEntradaEstoqueProps;

        try{
            dadosValidados =  formValidationSchema.parse(dados);
        }catch(error){
            if(error instanceof z.ZodError){
                const errorValidation: Record<string, string> = {};
                error.errors.map((err) => {
                    errorValidation[err.path.toString()] = err.message;
                });
                console.log(errorValidation);
                formRef.current?.setErrors(errorValidation);
            }
        }


        if (id === 'nova') {
            try {
                const result = await entradaService.create(dadosValidados!);

                if (result instanceof Error) {
                    alert("Error ao criar registro")
                } else {
                    if (isSaveAndClose()) {
                        navigate(`/entradas`);

                    } else {
                        navigate(`/entradas/detalhes/${result}`);
                    }
                }

            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const result = await entradaService.updateById(Number(id), dadosValidados!);

                if (result instanceof Error) {
                    return alert("Error ao criar registro")
                }

                if (isSaveAndClose()) {
                    navigate(`/entradas`);

                } else {
                    navigate(`/entradas/detalhes/${result}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <LayoutBaseDePagina
            titulo={'Entradas no estoque'}
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarSalvar={save}
                    aoClicarSalvarEFechar={saveAndClose}
                    aoClicarVoltar={() => navigate('/entradas')}
                    aoClicarApagar={() => handleDelete(Number(id))}
                    aoClicarNovo={() => navigate('/entradas/detalhes/nova')}
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
                                <VTextField label="Produto" name="produto_id" disabled={isLoading} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                                <VTextField label="quantidade" name="quantidade" disabled={isLoading} />
                            </Grid>
                        </Grid>

                        <Grid container direction='row' padding={2} spacing={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                                <VTextField label="DD/MM/AAAA" name="entrada_data" disabled={isLoading} />
                            </Grid>
                        </Grid>

                    </Grid>

                </Box>

            </VForm>

        </LayoutBaseDePagina>
    )
}