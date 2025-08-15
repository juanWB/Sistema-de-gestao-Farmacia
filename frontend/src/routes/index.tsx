import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { AddBox, IndeterminateCheckBox, Inventory2, LocalShipping } from '@mui/icons-material';
import { Dashboard, DetalheDeProduto, ListagemDeProdutos } from '../pages';

export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();

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
    },[])

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard/>}/>
            <Route path='/produtos' element={<ListagemDeProdutos/>}/>
            <Route path='/produtos/detalhes/:id' element={<DetalheDeProduto/>}/>
            <Route path='*' element={<Navigate to={'/pagina-inicial'} />}/>
        </Routes>
    )
}