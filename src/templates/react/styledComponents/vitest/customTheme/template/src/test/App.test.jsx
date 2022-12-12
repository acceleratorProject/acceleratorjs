import { render, screen } from '@testing-library/react'
import App from '../App'
import Theme from '../styles/theme'
import GlobalStyle from '../styles/Global'
describe('App', () => {
  test('Title should match', () => {
    render(
      <Theme>
        <GlobalStyle />
        <App />
      </Theme>
    )
    expect(
      screen.getByText('Vite + React + Styled-Components + Vitest')
    ).toBeDefined()
  })
})
