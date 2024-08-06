import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <main>This app is using the dark mode</main>
        </ThemeProvider>
    )
}

export default App
