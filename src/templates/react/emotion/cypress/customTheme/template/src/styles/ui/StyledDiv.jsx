import styled from '@emotion/styled'

const StyledDiv = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors?.background?.dark};
`

export default StyledDiv
