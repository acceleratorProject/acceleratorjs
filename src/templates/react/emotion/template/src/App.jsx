import { css } from '@emotion/react'
function App() {
  return (
    <div
      css={css`
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #424242;
      `}
    >
      <h1
        css={css`
          font-family: Montserrat;
          font-weight: 700;
          letter-spacing: 0.025em;
          text-align: center;
          color: #ba68c8;

          @media (min-width: 600px) {
            font-size: 2.25rem;
          }

          @media (min-width: 900px) {
            font-size: 3.75rem;
          }
        `}
      >
        Vite + React + Emotion + Vitest + Cypress
      </h1>
    </div>
  )
}

export default App
