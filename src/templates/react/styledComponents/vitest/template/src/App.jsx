import styled from 'styled-components'

const App = () => {
  return (
    <StyledApp>
      <h1>Vite + React + Styled-Components + Vitest</h1>
    </StyledApp>
  )
}

export default App

const StyledApp = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #242424;
  color: #6b43b2;
`
