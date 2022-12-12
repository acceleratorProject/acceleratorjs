import Box from '@mui/material/Box'
import { useTheme } from '@mui/system'

function App() {
  const theme = useTheme()

  return (
    <Box
      color={theme.palette.secondary.light}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: theme.typography.h1.fontFamily,
        fontWeight: theme.typography.h1.fontWeight,
        fontSize: theme.typography.h1.fontSize,
        letterSpacing: theme.typography.h1.letterSpacing,
        backgroundColor: theme.palette.background.dark
      }}
    >
      <h1>Vite + React + MUI + Vitest + Cypress</h1>
    </Box>
  )
}

export default App
