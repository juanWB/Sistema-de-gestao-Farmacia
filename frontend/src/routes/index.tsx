import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { AddBox, IndeterminateCheckBox, Inventory2, LocalShipping } from '@mui/icons-material';
import { AppDashboard } from '../pages';

export const AppRoutes = () => {
    const { setDrawerOptions, toggleDrawerOpen } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: <Inventory2 color='primary' />,
                label: 'Produtos',
                path: '/produtos'
            },
            {
                icon: <LocalShipping color='primary' />,
                label: 'Fornecedores',
                path: '/fornecedores'
            },
            {
                icon: <AddBox color='primary' />,
                label: 'Entradas no Estoque',
                path: '/entradas'
            },
            {
                icon: <IndeterminateCheckBox color='primary' />,
                label: 'Saídas no Estoque',
                path: '/saidas'
            },
        ])
    })

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<AppDashboard/>}></Route>
            <Route path='/produtos' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}  >Salvar</Button>}></Route>
            <Route path='/categorias' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}  >Salvar</Button>}></Route>
            <Route path='/fornecedores' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}  >Salvar</Button>}></Route>
            <Route path='/entradas' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}  >Salvar</Button>}></Route>
            <Route path='/saidas' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}  >Salvar</Button>}></Route>
            <Route path='*' element={<Navigate to={'/pagina-inicial'} />} />
        </Routes>
    )
}