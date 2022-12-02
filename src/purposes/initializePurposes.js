import prompts from 'prompts'
import { initActions } from '../actions/init.js'
import { state } from '../state/state.js'
import { initialPurposes } from './purposes.js'

export const initializePurposes = async () => {
  if (state.error) {
    console.error(state.errorMessage)
    return
  }
  const questions = [
    {
      type: 'multiselect',
      name: 'purpose',
      message: 'What do you want to configure with accelerator?',
      hint: '- Space to select. Return to submit',
      choices: initialPurposes.map((purpose) => {
        const purposeColor = purpose.color
        return {
          title: purposeColor(purpose.display || purpose.name),
          value: purpose,
          selected: purpose.selected
        }
      })
    }
  ]

  const answers = await prompts(questions)
  const formattedAnswers = answers.purpose?.map(({ name }) => name)
  await initActions(formattedAnswers)
}
