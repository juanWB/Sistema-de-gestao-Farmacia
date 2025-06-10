import { Add } from "@mui/icons-material";
import { Box, Button, Paper, TextField, useTheme } from "@mui/material"

interface IBarraDeFerramentasProps {
    textoCampoBusca?: string;
    mostrarCampoBusca?: boolean; 
    handleChange?: (novoTexto: string) => void;
    textoButton?: string;
    mostrarButton?: boolean;
    handleClick?: () => void;
}

export const BarraDeFerramentas: React.FC<IBarraDeFerramentasProps> = ({
    textoCampoBusca = '',
    mostrarCampoBusca = false,
    handleChange,
    textoButton = 'Novo',
    mostrarButton = true,
    handleClick

}) => {
    const theme = useTheme();

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            gap={1}
            padding={2}
            marginX={1}
            paddingX={1}
            component={Paper}
            height={theme.spacing(8)}
        >
           {mostrarCampoBusca  && ( <TextField
                size="small"
                placeholder="Pesquisar..."
                value={textoCampoBusca}
                onChange={(e) => handleChange?.(e.target.value)}
            />)}
            <Box
                flex={1}
                display={'flex'}
                justifyContent={'end'} >
              {mostrarButton && (  <Button
                    variant="contained"
                    color="primary"
                    disableElevation={true}
                    onClick={handleClick}
                    startIcon={<Add/>}
                    >
                    {textoButton}
                </Button>)}
            </Box>
        </Box>
    )
}