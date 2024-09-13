import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import MenuPage from './menuPage'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <MenuPage />
        </ThemeProvider>
    )
}

export default App
