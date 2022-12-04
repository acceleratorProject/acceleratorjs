import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  test('title should match', () => {
    render(<App />)
    expect(
      screen.getByText('Vite + React + MUI + Vitest + Cypress')
    ).toBeDefined()
  })
})
