import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
    palette:{
        mode: 'light',
        primary: {
            main: '#12577B',
            dark: '#0d425d',
            light: '#4d89a3',
            contrastText: '#fff'
        },
        secondary: {
            main: '#A9CFE5',
            dark: '#87b8d7',
            light: '#c6e0f0',
            contrastText: '#000000'
        },
        background: {
            default: '#f7f7f7',
            paper: '#021B33'
        },
    },
});