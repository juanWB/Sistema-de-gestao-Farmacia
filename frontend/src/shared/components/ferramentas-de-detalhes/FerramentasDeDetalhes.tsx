import { Add, ArrowBack, Delete, Save } from "@mui/icons-material";
import { Box, Button, Divider, Paper, useTheme } from "@mui/material"



export const FerramentasDeDetalhes: React.FC = () => {
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

            <Button
                variant="contained"
                color="primary"
                disableElevation={true}
                startIcon={<Save />}
            >
                Salvar
            </Button>

            <Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                startIcon={<Add />}
            >
                Novo
            </Button>

            <Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                startIcon={<Save />}
            >
                Salvar e voltar
            </Button>

            <Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                startIcon={<Delete />}
            >
                Apagar
            </Button>

            <Divider variant="middle" orientation="vertical"/>

             <Button
                variant="outlined"
                color="primary"
                disableElevation={true}
                startIcon={<ArrowBack />}
            >
                Voltar
            </Button>

        </Box>
    )
}   