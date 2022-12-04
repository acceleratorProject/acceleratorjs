import Box from '@mui/material/Box'
import { deepPurple, blueGrey } from '@mui/material/colors'
function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: blueGrey[700],
        color: deepPurple[400]
      }}
    >
      <h1>Vite + React + MUI</h1>
    </Box>
  )
}

export default App
