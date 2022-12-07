import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import Theme from '../styles/theme'
import App from '../App'

describe('App', () => {
  test('title should match', () => {
    render(
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    )
    expect(screen.getByText('Vite + React + MUI + Vitest')).toBeDefined()
  })
})
