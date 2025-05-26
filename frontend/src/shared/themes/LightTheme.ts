import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
    palette:{
        mode: 'light',
        primary: {
            main: '#12577B',
            dark: '#0d425d',
            light: '#A9CFE5',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#A9CFE5',
            dark: '#87b8d7',
            light: '#d8e9f5',
            contrastText: '#021B33'
        },
        background: {
            default: '#f7f7f7',
            paper: '#ffffff'
        },
        text: {
            primary: '#021B33',
            secondary: '#12577B',
            disabled: 'rgba(2, 27, 51, 0.38)',
        }
    },
    components: {
        MuiDrawer: {
            styleOverrides:{
                paper:{
                    backgroundColor: '#021B33',
                    color: '#A9CFE5'
                }
            }
        }
    }
});