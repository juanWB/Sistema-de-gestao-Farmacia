import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
    palette:{
        mode: 'dark',
        primary: {
            main: '#4d89a3',
            dark: '#12577B',
            light: '#7ba7bb',
            contrastText: '#fff'
        },
        secondary: {
            main: '#A9CFE5',
            dark: '#87b8d7',
            light: '#c6e0f0',
            contrastText: '#000000'
        },
        background: {
            default: '#021B33',
            paper: '#0d425d'
        },
    },
});