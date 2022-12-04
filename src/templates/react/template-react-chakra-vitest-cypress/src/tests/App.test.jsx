import { ChakraProvider } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('title should match', () => {
    render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    )
    expect(
      screen.getByText('Vite + React + Chakra UI + Vitest + Cypress')
    ).toBeDefined()
  })
})
