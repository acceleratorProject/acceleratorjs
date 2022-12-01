import prompts from 'prompts'
import { initActions } from '../actions/init.js'
import { purposes } from './purposes.js'
export const initPurpose = async (framework) => {
  const questions = [
    {
      type: 'multiselect',
      name: 'purpose',
      message: 'What do you want to configure with accelerator?',
      hint: '- Space to select. Return to submit',
      choices: purposes.map((purpose) => {
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
  await initActions(formattedAnswers, framework)
}
