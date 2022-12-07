import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('title should match', () => {
    render(<App />)
    expect(
      screen.getByText('Vite + React + Vitest')
    ).toBeDefined()
  })
})
