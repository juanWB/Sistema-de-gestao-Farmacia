import { Add, ArrowBack, ArrowDropDownCircleOutlined, Delete, Save } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Divider, Menu, MenuItem, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useState } from "react";

interface IFerramentasDeDetalhes {
    textoBotao?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEFechar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoVoltar?: boolean;

    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarEFecharCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;

    aoClicarNovo?: () => void;
    aoClicarSalvar?: () => void;
    aoClicarVoltar?: () => void;
    aoClicarSalvarEFechar?: () => void;
    aoClicarApagar?: () => void;
}


export const FerramentasDeDetalhes: React.FC<IFerramentasDeDetalhes> = ({
    textoBotao = 'Novo',

    mostrarBotaoVoltar = true,
    mostrarBotaoSalvarEFechar = false,
    mostrarBotaoSalvar = true,
    mostrarBotaoNovo = true,
    mostrarBotaoApagar = true,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoVoltarCarregando = false,

    aoClicarApagar,
    aoClicarNovo,
    aoClicarSalvar,
    aoClicarSalvarEFechar,
    aoClicarVoltar
}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const menuOpen = Boolean(anchorEl);

    const handleToggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    return (
        <Box display={'flex'}
            alignItems={'center'}
            gap={1}
            padding={2}
            marginX={1}
            paddingX={1}
            component={Paper}
            height={theme.spacing(8)}>

            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && !smDown) && (<Button
                variant="contained"
                color="primary"
                disableElevation={true}
                onClick={aoClicarSalvar}
                startIcon={<Save />}
            >
                <Typography variant="button" whiteSpace={'nowrap'} textOverflow={"ellipsis"} overflow={"hidden"}>
                    Salvar
                </Typography>
            </Button>)}

            {mostrarBotaoSalvarCarregando && (<Skeleton width={110} height={60} />)}

            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (<Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                onClick={aoClicarNovo}
                startIcon={<Add />}
            >
                <Typography variant="button" whiteSpace={'nowrap'} textOverflow={"ellipsis"} overflow={"hidden"}>
                    {textoBotao}
                </Typography>
            </Button>)}

            {mostrarBotaoNovoCarregando && (<Skeleton width={100} height={60} />)}

            {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !mdDown) && (<Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                onClick={aoClicarSalvarEFechar}
                startIcon={<Save />}
            >
                <Typography variant="button" whiteSpace={'nowrap'} textOverflow={"ellipsis"} overflow={"hidden"}>
                    Salvar e voltar
                </Typography>
            </Button>)}

            {mostrarBotaoSalvarEFecharCarregando && (<Skeleton width={180} height={60} />)}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando && !smDown) && (<Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                onClick={aoClicarApagar}
                startIcon={<Delete />}
            >
                <Typography variant="button" whiteSpace={'nowrap'} textOverflow={"ellipsis"} overflow={"hidden"}>
                    Apagar
                </Typography>
            </Button>)}

            {mostrarBotaoApagarCarregando && (<Skeleton width={100} height={60} />)}


            {mostrarBotaoVoltar
                && (mostrarBotaoApagar || mostrarBotaoNovo || mostrarBotaoSalvarEFecharCarregando || mostrarBotaoSalvar)
                && (
                    <Divider variant="middle" orientation="vertical" />
                )}

            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && !smDown) && (<Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                onClick={aoClicarVoltar}
                startIcon={<ArrowBack />}
            >
                <Typography variant="button" whiteSpace={'nowrap'} textOverflow={"ellipsis"} overflow={"hidden"}>
                    Voltar
                </Typography>
            </Button>)}

            {mostrarBotaoVoltarCarregando && (<Skeleton width={100} height={60} />)}

            {smDown && (
                <Box width={'100%'} display={'flex'} justifyContent={'end'}>


                    <ButtonGroup variant="contained" >
                        <Button>Opções</Button>
                        <Button
                            onClick={handleToggleMenu} >
                            <ArrowDropDownCircleOutlined />
                        </Button>
                    </ButtonGroup>


                    <Menu
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleCloseMenu}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        {mostrarBotaoNovo && (
                            <MenuItem onClick={() => { handleCloseMenu(); aoClicarNovo?.(); }}>
                                <Add fontSize="small" sx={{ marginRight: 1 }} />
                                <Divider variant="middle" orientation="vertical" sx={{
                                    marginX: '10px'
                                }} />
                                Novo
                            </MenuItem>
                        )}

                        {mostrarBotaoSalvar && (
                            <MenuItem onClick={() => { handleCloseMenu(); aoClicarSalvar?.(); }}>
                                <Save fontSize="small" sx={{ marginRight: 1 }} />
                                <Divider variant="middle" orientation="vertical" sx={{
                                    marginX: '10px'
                                }} />
                                Salvar
                            </MenuItem>
                        )}

                        {mostrarBotaoSalvarEFechar && (
                            <MenuItem onClick={() => { handleCloseMenu(); aoClicarSalvarEFechar?.(); }} >
                                <Save fontSize="small" sx={{ marginRight: 1 }} />
                                <Divider variant="middle" orientation="vertical" sx={{
                                    marginX: '10px'
                                }} />
                                Salvar e voltar
                            </MenuItem>
                        )}

                        {mostrarBotaoApagar && (
                            <MenuItem onClick={() => { handleCloseMenu(); aoClicarApagar?.(); }} >
                                <Delete fontSize="small" sx={{ marginRight: 1 }} />
                                <Divider variant="middle" orientation="vertical" sx={{
                                    marginX: '10px'
                                }} />
                                Apagar
                            </MenuItem>
                        )}

                        {mostrarBotaoVoltar && (
                            <MenuItem onClick={() => { handleCloseMenu(); aoClicarVoltar?.(); }} >
                                <ArrowBack fontSize="small" sx={{ marginRight: 1 }} />
                                <Divider variant="middle" orientation="vertical" sx={{
                                    marginX: '10px'
                                }} />
                                Voltar
                            </MenuItem>
                        )}
                    </Menu>
                </Box>
            )}
        </Box>
    )
}   