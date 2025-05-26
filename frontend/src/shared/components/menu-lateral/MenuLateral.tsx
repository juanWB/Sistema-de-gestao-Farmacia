import { Home } from "@mui/icons-material";
import { Avatar, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { Box } from "@mui/system";

interface IMenuLareralProps{
    children: React.ReactNode;
}


export const MenuLateral: React.FC<IMenuLareralProps> = ({children}) => {
    const theme = useTheme();
    return(
        <>
            <Drawer 
                variant="permanent"
            >
                <Box width={theme.spacing(28)} height='100vh' display='flex' flexDirection='column'>
                    <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
                        <Avatar 
                            sx={{
                                height: theme.spacing(18),
                                width: theme.spacing(18)
                            }}
                            src="https://sdmntprwestus2.oaiusercontent.com/files/00000000-8ce8-61f8-877e-21d45d0b26e3/raw?se=2025-05-23T23%3A00%3A12Z&sp=r&sv=2024-08-04&sr=b&scid=d6914a46-05fe-513a-99fc-833a771ea5dc&skoid=864daabb-d06a-46b3-a747-d35075313a83&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-23T18%3A19%3A05Z&ske=2025-05-24T18%3A19%3A05Z&sks=b&skv=2024-08-04&sig=iV7txlS77vXeyUw3bLBKGCXWvss4bSfs40%2BCFp4psr0%3D"
                            />
                    </Box>

                    <Divider color="#A9CFE5"/> 

                    <Box flex={1}>
                         <List component='nav' >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Home color="primary"/>
                                    </ListItemIcon>
                                    <ListItemText primary='Página inicial'/>
                                </ListItemButton>
                         </List>
                    </Box>
                </Box>
            </Drawer>

            <Box height='100vh' marginLeft={theme.spacing(28)}>
                {children}
            </Box>
        </>
    )
}