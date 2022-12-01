import { init } from './vite/init/init.js'
import prompts from 'prompts'
import { blue, red, green, magenta } from 'kolorist'
import initializeConfig from './linting/bin/initialize.js'

const purpose = [
  {
    name: 'linting',
    display: 'Linting',
    color: blue
  },
  {
    name: 'styling',
    display: 'Styling',
    color: red
  },
  {
    name: 'testing',
    display: 'Testing',
    color: green
  },
  {
    name: 'architecture',
    display: 'Architecture',
    color: magenta
  }
]

const initAccelerator = async () => {
  const questions = [
    {
      type: 'multiselect',
      name: 'purpose',
      message: 'What do you want to configure with accelerator?',
      hint: '- Space to select. Return to submit',
      choices: purpose.map((purpose) => {
        const purposeColor = purpose.color
        return {
          title: purposeColor(purpose.display || purpose.name),
          value: purpose
        }
      })
    }
  ]

  const answers = await prompts(questions)
  const formattedAnswers = answers.purpose.map(({ name }) => name)
  await initActions(formattedAnswers)
}

const options = {
  linting: {
    action: initializeConfig
  }
}

async function initActions(params) {
  params.map((name) => options[name].action('none'))
}

init().then(() => {
  initAccelerator()
})
