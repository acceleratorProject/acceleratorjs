import styled from '@emotion/styled'

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.colors.secondary.light};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};

  @media (min-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }

  @media (min-width: 900px) {
    font-size: ${({ theme }) => theme.fontSizes['6xl']};
  }
`

export default StyledTitle
