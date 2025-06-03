import { Menu } from "@mui/icons-material";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {
    titulo: string;
    children: React.ReactNode;
}


export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const {toggleDrawerOpen} = useDrawerContext();
    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={1} height={theme.spacing(12)} display="flex" alignItems='center' gap={1}>
                <Typography variant="h3">
                    {smDown &&
                        <IconButton onClick={toggleDrawerOpen}>
                            <Menu />
                        </IconButton>
                    }
                    {titulo}
                </Typography>
            </Box>

            <Box>
                Cabecalho
            </Box>

            <Box>
                {children}
            </Box>
        </Box>
    );
}