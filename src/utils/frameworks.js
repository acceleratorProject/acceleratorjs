import { blue, cyan, green, magenta, red, yellow } from 'kolorist'

export const FRAMEWORKS = [
  {
    name: 'react',
    display: 'React',
    color: cyan,
    variants: [
      {
        name: 'vitest',
        display: 'Vitest',
        color: green,
        variants: [
          {
            name: 'react-css-vitest',
            display: 'CSS',
            color: green
          },
          {
            name: 'react-chakra-vitest',
            display: 'Chakra UI',
            color: red
          },
          {
            name: 'react-mui-vitest',
            display: 'MUI',
            color: blue
          },
          {
            name: 'react-tailwind-vitest',
            display: 'Tailwind',
            color: magenta
          },
          {
            name: 'react-emotion-vitest',
            display: 'Emotion',
            color: yellow
          },
          {
            name: 'react-styledComponents-vitest',
            display: 'Styled-Components',
            color: cyan
          }
        ]
      },
      {
        name: 'cypress',
        display: 'Cypress',
        color: blue,
        variants: [
          {
            name: 'react-css-cypress',
            display: 'CSS',
            color: green
          },
          {
            name: 'react-chakra-cypress',
            display: 'Chakra UI ',
            color: red
          },
          {
            name: 'react-mui-cypress',
            display: 'MUI',
            color: blue
          },
          {
            name: 'react-tailwind-cypress',
            display: 'Tailwind',
            color: magenta
          },
          {
            name: 'react-emotion-cypress',
            display: 'Emotion',
            color: yellow
          },
          {
            name: 'react-styledComponents-cypress',
            display: 'Styled-Components',
            color: cyan
          }
        ]
      },
      {
        name: 'vitest&cypress',
        display: 'Vitest & Cypress',
        color: yellow,
        variants: [
          {
            name: 'react-css-vitest-cypress',
            display: 'CSS',
            color: green
          },
          {
            name: 'react-chakra-vitest-cypress',
            display: 'Chakra UI',
            color: red
          },
          {
            name: 'react-mui-vitest-cypress',
            display: 'MUI',
            color: blue
          },
          {
            name: 'react-tailwind-vitest-cypress',
            display: 'Tailwind',
            color: magenta
          },
          {
            name: 'react-emotion-vitest-cypress',
            display: 'Emotion',
            color: yellow
          },
          {
            name: 'react-styledComponents-vitest-cypress',
            display: 'Styled-Components',
            color: cyan
          }
        ]
      },

      {
        name: 'none',
        display: 'None',
        color: red,
        variants: [
          {
            name: 'react-css',
            display: 'Only React ',
            color: cyan
          },
          {
            name: 'react-chakra',
            display: 'Chakra UI',
            color: red
          },
          {
            name: 'react-mui',
            display: 'MUI',
            color: blue
          },
          {
            name: 'react-tailwind',
            display: 'Tailwind',
            color: magenta
          },
          {
            name: 'react-emotion',
            display: 'Emotion',
            color: yellow
          },
          {
            name: 'react-styledComponents',
            display: 'Styled-Components',
            color: cyan
          }
        ]
      }
    ]
  },

  {
    name: 'vanilla',
    display: 'Vanilla',
    color: yellow,
    variants: [
      {
        name: 'vitest',
        display: 'Vitest',
        color: green,
        variants: [
          {
            name: 'vanilla-css-vitest',
            display: 'CSS ',
            color: green
          },
          {
            name: 'vanilla-tailwind-vitest',
            display: 'Tailwind',
            color: magenta
          }
        ]
      },
      {
        name: 'cypress',
        display: 'Cypress',
        color: blue,
        variants: [
          {
            name: 'vanilla-css-cypress',
            display: 'CSS',
            color: green
          },
          {
            name: 'vanilla-tailwind-cypress',
            display: 'Tailwind',
            color: magenta
          }
        ]
      },
      {
        name: 'vitest&cypress',
        display: 'Vitest & Cypress',
        color: yellow,
        variants: [
          {
            name: 'vanilla-css-vitest-cypress',
            display: 'CSS',
            color: green
          },
          {
            name: 'vanilla-tailwind-vitest-cypress',
            display: 'Tailwind',
            color: magenta
          }
        ]
      },
      {
        name: 'none',
        display: 'None',
        color: red,
        variants: [
          {
            name: 'vanilla-css',
            display: 'Only Vanilla',
            color: yellow
          },
          {
            name: 'vanilla-tailwind',
            display: 'Tailwind ',
            color: magenta
          }
        ]
      }
    ]
  }
]
