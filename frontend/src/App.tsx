import React from 'react'
import { AppRoutes } from './routes'
import { AppThemeProvider } from './shared/contexts/ThemeContext'
import { MenuLateral } from './shared/components/index'
export const App = () => {

  return (
    <AppThemeProvider>
      <MenuLateral>
        <AppRoutes />
      </MenuLateral>
    </AppThemeProvider>
  )
}


