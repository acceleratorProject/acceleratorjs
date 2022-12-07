import { Heading, Stack } from '@chakra-ui/react'

function App() {
  return (
    <Stack
      direction={{ base: 'column' }}
      justifyContent='center'
      alignContent='center'
      textAlign='center'
      h='calc(100vh)'
      bg='background.dark'
    >
      <Heading
        as='h1'
        color='secondary.light'
        fontFamily='heading'
        fontWeight='bold'
        letterSpacing='wide'
        fontSize={{ sm: '4xl', md: '6xl' }}
      >
        Vite + React + Chakra UI
      </Heading>
    </Stack>
  )
}

export default App
