import { blue, green, magenta, red } from 'kolorist'
export const initialPurposes = [
  {
    name: 'linting',
    display: 'Linting',
    color: blue,
    selected: true
  },
  {
    name: 'styling',
    display: 'Styling',
    color: red,
    selected: false
  },
  {
    name: 'testing',
    display: 'Testing',
    color: green,
    selected: false
  },
  {
    name: 'architecture',
    display: 'Architecture',
    color: magenta,
    selected: false
  }
]

export const lintingPurposes = [
  {
    name: 'eslint',
    display: 'ESlint',
    color: magenta,
    selected: true
  },
  {
    name: 'prettier',
    display: 'Prettier',
    color: blue,
    selected: true
  }
]
