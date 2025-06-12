import { Add, ArrowBack, Delete, Save } from "@mui/icons-material";
import { Box, Button, Divider, Paper, useTheme } from "@mui/material"

interface IFerramentasDeDetalhes {
    textoBotao: string;

    mostraBotaoNovo: boolean;
    mostraBotaoSalvar: boolean;
    mostraBotaoSalvarEFechar: boolean;
    mostraBotaoApagar: boolean;
    mostraBotaoVoltar: boolean;

    aoClicarNovo: () => void;
    aoClicarSalvar: () => void;
    aoClicarVoltar: () => void;
    aoClicarSalvarEFechar: () => void;
    aoClicarApagar: () => void;
}


export const FerramentasDeDetalhes: React.FC<IFerramentasDeDetalhes> = ({
    textoBotao = 'Novo',

    mostraBotaoVoltar = true,
    mostraBotaoSalvarEFechar = false,
    mostraBotaoSalvar = true,
    mostraBotaoNovo = true,
    mostraBotaoApagar = true,

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

            {mostraBotaoSalvar && (<Button
                variant="contained"
                color="primary"
                disableElevation={true}
                onClick={aoClicarSalvar}
                startIcon={<Save />}
            >
                Salvar
            </Button>)}

            {mostraBotaoNovo && (<Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                onClick={aoClicarNovo}
                startIcon={<Add />}
            >
                Novo
            </Button>)}
            
            {mostraBotaoSalvarEFechar && (<Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                onClick={aoClicarSalvarEFechar}
                startIcon={<Save />}
            >
                Salvar e voltar
            </Button>)}

           {mostraBotaoApagar && ( <Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                onClick={aoClicarApagar}
                startIcon={<Delete />}
            >
                Apagar
            </Button>)}

            <Divider variant="middle" orientation="vertical" />

            {mostraBotaoVoltar && (<Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                onClick={aoClicarVoltar}
                startIcon={<ArrowBack />}
            >
                Voltar
            </Button>)}

        </Box>
    )
}   