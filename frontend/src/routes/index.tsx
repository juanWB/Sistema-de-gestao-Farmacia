import { Button } from '@mui/material';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAppThemeContext } from '../shared/contexts/ThemeContext';

export const AppRoutes = () => {
    const { toggleTheme } = useAppThemeContext();

    return(
    <BrowserRouter>
        <Routes>
            <Route path='/pagina-inicial' element={<Button variant='contained' color='primary' onClick={toggleTheme}  >Salvar</Button>}></Route>
            <Route path='*' element={<Navigate to={'/pagina-inicial'} />}/>
        </Routes>
    </BrowserRouter>
    )
}