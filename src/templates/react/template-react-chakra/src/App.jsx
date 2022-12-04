import { Heading, Stack } from '@chakra-ui/react'

function App() {
  return (
    <Stack
      direction={{ base: 'column' }}
      justifyContent='center'
      alignContent='center'
      textAlign='center'
      h='calc(100vh)'
      bg='gray.800'
    >
      <Heading as='h1' color='purple.300'>
        Vite + React + Chakra UI + Vitest
      </Heading>
    </Stack>
  )
}

export default App
