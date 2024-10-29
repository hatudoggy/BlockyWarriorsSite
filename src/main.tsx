import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import App from './pages/App'
import 'bootstrap/dist/css/bootstrap.min.css'

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



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <App />
    </ThemeProvider>
  </StrictMode>,
)
