import { createContext, useCallback, useContext, useMemo, useState} from 'react';
import { LightTheme } from '../../themes/LightTheme';
import { DarkTheme } from '../../themes/DarkTheme';
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/system';
import { CssBaseline } from '@mui/material';


interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);


interface IThemeProviderProps {
    children: React.ReactNode
}

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

export const AppThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');


    const toggleTheme = useCallback (() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, []);

    const theme = useMemo(() => {
        if (themeName === 'light')return LightTheme;
        
        return DarkTheme;
    }, [themeName])

    return(
        <ThemeContext.Provider value={{themeName, toggleTheme}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}