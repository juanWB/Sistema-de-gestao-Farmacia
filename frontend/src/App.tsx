import React from 'react'
import { AppRoutes } from './routes'
import { AppThemeProvider, DrawerProvider } from './shared/contexts/index'
import { BrowserRouter } from 'react-router-dom'
import { MenuLateral } from './shared/components'
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


