import { Add, ArrowBack, Delete, Save } from "@mui/icons-material";
import { Box, Button, Divider, Paper, Skeleton, useTheme } from "@mui/material"

interface IFerramentasDeDetalhes {
    textoBotao?: string;

    mostraBotaoNovo?: boolean;
    mostraBotaoSalvar?: boolean;
    mostraBotaoSalvarEFechar?: boolean;
    mostraBotaoApagar?: boolean;
    mostraBotaoVoltar?: boolean;

    mostraBotaoNovoCarregando?: boolean;
    mostraBotaoSalvarCarregando?: boolean;
    mostraBotaoSalvarEFecharCarregando?: boolean;
    mostraBotaoApagarCarregando?: boolean;
    mostraBotaoVoltarCarregando?: boolean;

    aoClicarNovo?: () => void;
    aoClicarSalvar?: () => void;
    aoClicarVoltar?: () => void;
    aoClicarSalvarEFechar?: () => void;
    aoClicarApagar?: () => void;
}


export const FerramentasDeDetalhes: React.FC<IFerramentasDeDetalhes> = ({
    textoBotao = 'Novo',

    mostraBotaoVoltar = true,
    mostraBotaoSalvarEFechar = false,
    mostraBotaoSalvar = true,
    mostraBotaoNovo = true,
    mostraBotaoApagar = true,

    mostraBotaoNovoCarregando = false,
    mostraBotaoSalvarCarregando = false,
    mostraBotaoSalvarEFecharCarregando = false,
    mostraBotaoApagarCarregando = false,
    mostraBotaoVoltarCarregando = false,

    aoClicarApagar,
    aoClicarNovo,
    aoClicarSalvar,
    aoClicarSalvarEFechar,
    aoClicarVoltar
}) => {
    const theme = useTheme();

    return (
        <Box display={'flex'}
            alignItems={'center'}
            gap={1}
            padding={2}
            marginX={1}
            paddingX={1}
            component={Paper}
            height={theme.spacing(8)}>

            {(mostraBotaoSalvar && !mostraBotaoSalvarCarregando) && (<Button
                variant="contained"
                color="primary"
                disableElevation={true}
                onClick={aoClicarSalvar}
                startIcon={<Save />}
            >
                Salvar
            </Button>)}

            {mostraBotaoSalvarCarregando && (<Skeleton width={110} height={60} />)}

            {(mostraBotaoNovo && !mostraBotaoNovoCarregando) && (<Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                onClick={aoClicarNovo}
                startIcon={<Add />}
            >
                Novo
            </Button>)}

            {mostraBotaoNovoCarregando && (<Skeleton width={100} height={60} />)}

            {(mostraBotaoSalvarEFechar && !mostraBotaoSalvarEFecharCarregando) && (<Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                onClick={aoClicarSalvarEFechar}
                startIcon={<Save />}
            >
                Salvar e voltar
            </Button>)}

            {mostraBotaoSalvarEFecharCarregando && (<Skeleton width={180} height={60} />)}

            {(mostraBotaoApagar && !mostraBotaoApagarCarregando) && (<Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                onClick={aoClicarApagar}
                startIcon={<Delete />}
            >
                Apagar
            </Button>)}

            {mostraBotaoApagarCarregando && (<Skeleton width={100} height={60} />)}


            <Divider variant="middle" orientation="vertical" />

            {(mostraBotaoVoltar && !mostraBotaoVoltarCarregando) && (<Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                onClick={aoClicarVoltar}
                startIcon={<ArrowBack />}
            >
                Voltar
            </Button>)}

            {mostraBotaoVoltarCarregando && (<Skeleton width={100} height={60} />)}


        </Box>
    )
}   