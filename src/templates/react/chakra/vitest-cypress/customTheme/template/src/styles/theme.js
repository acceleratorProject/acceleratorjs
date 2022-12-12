import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    common: {
      black: '#000',
      white: '#fff'
    },
    primary: {
      light: '#42a5f5',
      main: '#1976d2',
      dark: '#1565c0'
    },
    secondary: {
      light: '#ba68c8',
      main: '#ba68c8',
      dark: '#7b1fa2'
    },
    error: {
      light: '#ef5350',
      main: '#d32f2f',
      dark: '#c62828'
    },
    warning: {
      light: '#ff9800',
      main: '#ed6c02',
      dark: '#e65100'
    },
    info: {
      light: '#03a9f4',
      main: '#0288d1',
      dark: '#01579b'
    },
    success: {
      light: '#4caf50',
      main: '#2e7d32',
      dark: '#1b5e20'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    },
    background: {
      light: '#eeeeee',
      dark: '#424242'
    }
  },
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Montserrat, sans-serif'
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem'
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  },
  zIndices: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  },
  breakpoints: {
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px'
  }
})
