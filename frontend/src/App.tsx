import React from 'react'
import { AppRoutes } from './routes'
import { AppThemeProvider } from './shared/contexts/index'
import { BrowserRouter } from 'react-router-dom'
export const App = () => {

  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  )
}


