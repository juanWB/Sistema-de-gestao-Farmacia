import { Menu } from "@mui/icons-material";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../contexts";
import type { ReactNode } from "react";

interface ILayoutBaseDePaginaProps {
    titulo: string;
    barraDeFerramentas: ReactNode | undefined

    children: ReactNode;
}


export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo, barraDeFerramentas }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    

    const { toggleDrawerOpen } = useDrawerContext();
    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={1} height={smDown ? theme.spacing(6) : mdDown ? theme.spacing(8) : theme.spacing(12)} display="flex" alignItems='center' gap={1}>
                <Typography 
                    variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
                    overflow='hidden'
                    textOverflow='ellipsis'
                    >
                    {smDown &&
                        <IconButton onClick={toggleDrawerOpen}>
                            <Menu />
                        </IconButton>
                    }
                    {titulo}
                </Typography>
            </Box>

            {barraDeFerramentas && (<Box>
                {barraDeFerramentas}
            </Box>)}

            <Box flex={1} overflow='auto'>
                {children}
            </Box>
        </Box>
    );
}