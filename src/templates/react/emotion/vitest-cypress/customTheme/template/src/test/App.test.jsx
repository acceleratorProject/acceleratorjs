import { ThemeProvider } from '@emotion/react'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { theme } from '../styles/theme'

describe('App', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    )
  })
  test('title should match', () => {
    expect(
      screen.getByText('Vite + React + Emotion + Vitest + Cypress')
    ).toBeDefined()
  })
})
