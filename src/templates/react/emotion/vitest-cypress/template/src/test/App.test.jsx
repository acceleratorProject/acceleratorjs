import { render, screen } from '@testing-library/react'
import App from '../App'
describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })
  test('title should match', () => {
    expect(
      screen.getByText('Vite + React + Emotion + Vitest + Cypress')
    ).toBeDefined()
  })
})
