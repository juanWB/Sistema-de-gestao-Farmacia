import { AppRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'

import 'dayjs/locale/en-gb';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { MenuLateral } from './shared/components/index'
import { Login } from './shared/components/login/Login'
import { AppThemeProvider, AuthContextProvider, DrawerProvider } from './shared/contexts/index'
export const App = () => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
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
    </LocalizationProvider>
  )
}


