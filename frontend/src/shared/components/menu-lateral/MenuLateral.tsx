import { Avatar, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import { Box, useMediaQuery } from "@mui/system";
import logo from "./assets/logo.png";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAppThemeContext, useAuthContext, useDrawerContext } from "../../contexts";
import { Logout, Nightlight, Sunny } from "@mui/icons-material";

interface IListItemLinkProps {
    label: string;
    path: string;
    icon: React.ReactNode;
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ icon, label, onClick, path }) => {
    const navigate = useNavigate();
    const resolvedPath = useResolvedPath(path);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const handleClick = () => {
        navigate(path);
        onClick?.();
    }

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    )
}

interface IMenuLateralProps {
    children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { sair } = useAuthContext();
    const { themeName, toggleTheme } = useAppThemeContext();
    const { drawerOptions, isDrawerOpen, toggleDrawerOpen } = useDrawerContext()



    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>

                    <Box component='img' src={logo} alt='Logo' sx={{
                        width: '70%', marginLeft: "30px", marginBottom: 0, paddingBottom: 0

                    }} />

                    <Divider />

                    <Box sx={{ width: "90%", height: theme.spacing(10), display: 'flex', alignItems: "center", margin: "10px", marginBottom: "15px" }} >
                        <Avatar />
                    </Box>

                    <Box flex={1}>
                        <List component='nav'>
                            {drawerOptions.map(drawerOptions => (
                                <ListItemLink
                                    key={drawerOptions.path}
                                    icon={drawerOptions.icon}
                                    label={drawerOptions.label}
                                    path={drawerOptions.path}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                />
                            ))}
                        </List>
                    </Box>

                    <Box>
                        <List component='nav'>
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    {themeName === 'light' ? <Nightlight /> : <Sunny />}
                                </ListItemIcon>
                                <ListItemText primary='Mudar tema' />
                            </ListItemButton>
                        </List>
                        <List component='nav'>
                            <ListItemButton onClick={() => sair()}>
                                <ListItemIcon>
                                    <Logout/>
                                </ListItemIcon>
                                <ListItemText primary='Sair' />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Box flex={1} marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    )
}