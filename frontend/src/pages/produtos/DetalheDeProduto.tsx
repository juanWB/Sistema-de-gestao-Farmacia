import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { produtoService } from "../../shared/service/api/produtos/ProdutoService";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { FerramentasDeDetalhes } from "../../shared/components";
import { VTextField, VForm, useVFormRef } from "../../shared/forms";
import z from "zod";
import { AutoCompleteCategorias } from "./component/AutoCompleteCategorias";

const formValidationSchema = z.object({
        nome: z.string({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).nonempty("Campo obrigatório")
        .min(3, "O nome precisa ter 3 no mínimo caracteres")
        .max(100, "O nome não pode ultrapassar 100 caracteres.")
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Apenas letras e espaços são permitidos")
        .trim(),
        preco: z.coerce.number({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório',
        }).positive('O preço precisar ser maior do que 0.'),
        validade:z.string({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        })
        .nonempty('Campo obrigatório')
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'O formato deve ser YYYY-MM-DD')
        .transform((str) => new Date(str))
        .refine((date) => !isNaN(date.getTime()), { message: 'Data inválida' }),
        quantidade: z.coerce.number({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).nonnegative('O campo quantidade não pode ser menor que 0').int('O campo quantidade precisar ser um inteiro.'),
        categoria_id: z.coerce.number({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).positive('O id precisar ser maior do que 0.').int('O id precisar ser um inteiro.'),
        fornecedor_id: z.coerce.number({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).positive('O id precisar ser maior do que 0.').int('O id precisar ser um inteiro.')
});

type TProductProps = z.infer<typeof formValidationSchema>;

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
    }, [id, navigate, formRef]);

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

    const handleSave = async (dados: TProductProps) => {
        let dadosValidados: TProductProps;

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


        if (id === 'novo') {
            try {
                const result = await produtoService.create(dadosValidados!);

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
                const result = await produtoService.updateById(Number(id), dadosValidados!);

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
                                <AutoCompleteCategorias isExternalLoading={isLoading}/>
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