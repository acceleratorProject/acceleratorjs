import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  test('Title should match', () => {
    render(<App />)
    expect(
      screen.getByText('Vite + React + Styled-Components + Vitest + Cypress')
    ).toBeDefined()
  })
})
