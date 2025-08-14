import React from 'react'
import { AppRoutes } from './routes'
import { MenuLateral } from './shared/components/index'
import { BrowserRouter } from 'react-router-dom'
import { AppThemeProvider, AuthContextProvider, DrawerProvider } from './shared/contexts/index'
import { Login } from './shared/components/login/Login'
export const App = () => {

  return (
    <AuthContextProvider>

      <AppThemeProvider>
        <Login>
          <DrawerProvider>

            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>

          </DrawerProvider>
        </Login>
      </AppThemeProvider>

    </AuthContextProvider >
  )
}


