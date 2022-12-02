import prompts from 'prompts'
import { options } from '../../actions/options.js'
import { state } from '../../state/state.js'
import { lintingPurposes } from '../purposes.js'
export async function initializeLinting() {
  if (state.error) {
    console.error(state.errorMessage)
    return
  }
  const questions = [
    {
      type: 'multiselect',
      name: 'linting',
      message: 'Which ones do you want to use to give rules to your code?',
      hint: '- Space to select. Return to submit',
      choices: lintingPurposes.map((purpose) => {
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
  const formattedAnswers = answers.linting.map(({ name }) => name)

  formattedAnswers.map((name) => options.linting[name].action())
}
