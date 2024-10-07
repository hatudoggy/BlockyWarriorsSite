import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'
import Store from './pages/Store'


const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: '#14141a'
    },
    primary: {
      main: "#3e9c57",
      light: "#71d176",
    },
    secondary: {
      main: "#FFFFFF"
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        sx: {
          borderRadius: 3
        }
      }
    }
  }
})

const router = createHashRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "store",
    element: <Store />
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
