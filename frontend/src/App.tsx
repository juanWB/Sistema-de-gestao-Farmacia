import React from 'react'
import { AppRoutes } from './routes'
import { MenuLateral } from './shared/components/index'
import { BrowserRouter } from 'react-router-dom'
import { AppThemeProvider, DrawerProvider } from './shared/contexts/index'
export const App = () => {

  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  )
}


