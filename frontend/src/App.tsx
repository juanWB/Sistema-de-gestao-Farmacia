import React from 'react'
import { AppRoutes } from './routes'
import { AppThemeProvider } from './shared/contexts/ThemeContext'
export const App = () => {

  return (
   <AppThemeProvider>
      <AppRoutes/>
   </AppThemeProvider>
  )
}


