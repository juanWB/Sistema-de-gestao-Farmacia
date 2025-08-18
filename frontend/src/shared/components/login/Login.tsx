import { Box, Button, Card, CardActions, CardContent, CircularProgress, Link, TextField, Typography } from "@mui/material"
import React, { useState } from 'react';
import { useAuthContext } from "../../contexts";
import { ZodError } from "zod";
import { AxiosError } from "axios";
import { CadastroSchema, EntrarSchema } from "../../zodSchema";

interface ILoginsProps {
    children: React.ReactNode
}

export const Login: React.FC<ILoginsProps> = ({ children }) => {
    const [isRegistered, setIsRegistered] = useState(true);
    const { isAuthenticaded, entrar, cadastrar } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);

    const [nome, setNome] = useState('');
    const [nomeError, setNomeError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [senha, setSenha] = useState('');
    const [senhaError, setSenhaError] = useState('');

    const handleSubmit = async () => {
        setNomeError('');
        setEmailError('');
        setSenhaError('');
        if (isRegistered) {
            try {
                const dadosValidados = EntrarSchema.parse({ email, senha });
                setIsLoading(true);

                const result = await entrar(dadosValidados.email, dadosValidados.senha);

                if (result instanceof Error) {
                    setSenhaError(result.message);
                    setEmailError(result.message);
                } else {
                    setEmail('');
                    setSenha('');
                }

                setIsLoading(false);
            } catch (error) {

                if (error instanceof AxiosError) {
                    if (error.response?.status === 401) {
                        alert('Não autorizado, tente novamente.');
                    }
                }

                if (error instanceof ZodError) {
                    error.issues.forEach((err) => {
                        if (err.path.toString() === 'email') {
                            setEmailError(err.message);
                        } else if (err.path.toString() === 'senha') {
                            setSenhaError(err.message);
                        }
                    });
                }
            }
        } else {
            try {

                const dadosValidados = CadastroSchema.parse({ nome, email, senha });
                setIsLoading(true);

                const result = await cadastrar(dadosValidados.nome, dadosValidados.email, dadosValidados.senha);

                if (result instanceof Error) {
                    setEmailError(result.message);
                } else {
                    alert('Conta criada com sucesso.');
                    setNome('');
                    setEmail('');
                    setSenha('');
                    setIsRegistered(true);
                }


                setIsLoading(false);
            } catch (error) {

                if (error instanceof AxiosError) {
                    if (error.response?.status === 401) {
                        alert('Não autorizado, tente novamente.');
                    }
                }

                if (error instanceof ZodError) {
                    error.issues.forEach((err) => {
                        if (err.path.toString() === 'nome') {
                            setNomeError(err.message);
                        } else if (err.path.toString() === 'email') {
                            setEmailError(err.message);
                        } else if (err.path.toString() === 'senha') {
                            setSenhaError(err.message);
                        }
                    });
                }
            }
        }
    }

    const onChangeForm = () => {
        setEmail('');
        setSenha('');
        setEmailError('');
        setSenhaError('');
    }

    if (isAuthenticaded) return <>{children}</>;

    return (
        <Box
            width='100vw'
            height='100vh'
            display='flex'
            alignContent='center'
            justifyContent='center'
        >

            {isRegistered ? (<Card sx={{
                marginTop: '50px',
                width: '300px',
                height: '400px',
                border: '1px solid #F0EFE7',
                borderRadius: '6px',
                boxShadow: '4px 3px 32px 0px rgba(188,188,188,0.75)'
            }}>
                <CardContent>

                    <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
                        <Typography variant="h6">Login</Typography>

                        <TextField
                            label='Email'
                            fullWidth
                            type="email"
                            value={email}
                            disabled={isLoading}
                            error={!!emailError}
                            helperText={emailError}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={() => setEmailError('')}
                        />

                        <TextField
                            label='Senha'
                            fullWidth
                            type="password"
                            value={senha}
                            disabled={isLoading}
                            error={!!senhaError}
                            helperText={senhaError}
                            onChange={(e) => setSenha(e.target.value)}
                            onKeyDown={() => setSenhaError('')}
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Box width='100vw' display='flex' flexDirection='column' alignItems='center' justifyContent='center' marginTop={2} gap={2}>
                        <Button
                            variant="contained"
                            disabled={isLoading}
                            onClick={handleSubmit}
                            endIcon={isLoading ? <CircularProgress variant="indeterminate" color="inherit" /> : undefined}
                        >
                            Entrar
                        </Button>
                        <Link component='button' onClick={() => {setIsRegistered(false); onChangeForm()}}>Não possuo uma conta</Link>
                    </Box>
                </CardActions>
            </Card>) : (
                <Card sx={{
                    marginTop: '50px',
                    width: '300px',
                    height: '450px',
                    border: '1px solid #F0EFE7',
                    borderRadius: '6px',
                    boxShadow: '4px 3px 32px 0px rgba(188,188,188,0.75)'
                }}>
                    <CardContent>

                        <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
                            <Typography variant="h6">Cadastro</Typography>
                            <TextField
                                label='Nome'
                                fullWidth
                                type="text"
                                value={nome}
                                disabled={isLoading}
                                error={!!nomeError}
                                helperText={nomeError}
                                onChange={(e) => setNome(e.target.value)}
                                onKeyDown={() => setNomeError('')}
                            />

                            <TextField
                                label='Email'
                                fullWidth
                                type="email"
                                value={email}
                                disabled={isLoading}
                                error={!!emailError}
                                helperText={emailError}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={() => setEmailError('')}
                            />

                            <TextField
                                label='Senha'
                                fullWidth
                                type="password"
                                value={senha}
                                disabled={isLoading}
                                error={!!senhaError}
                                helperText={senhaError}
                                onChange={(e) => setSenha(e.target.value)}
                                onKeyDown={() => setSenhaError('')}
                            />
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box width='100vw' display='flex' alignContent='center' justifyContent='center' marginTop={2}>
                            <Button
                                variant="contained"
                                disabled={isLoading}
                                onClick={handleSubmit}
                                endIcon={isLoading ? <CircularProgress variant="indeterminate" color="inherit" /> : undefined}
                            >
                                Cadastrar
                            </Button>
                        </Box>
                    </CardActions>
                </Card>
            )}
        </Box>
    )
}