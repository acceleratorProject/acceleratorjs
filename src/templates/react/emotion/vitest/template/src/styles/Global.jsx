import { Global as GlobalEmotion } from '@emotion/react'

const Global = () => (
  <GlobalEmotion
    styles={() => [
      {
        '*': {
          padding: 0,
          margin: 0,
          boxSizing: 'border-box'
        }
      }
    ]}
  />
)

export default Global
