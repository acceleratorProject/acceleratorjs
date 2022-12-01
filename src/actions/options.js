import { initializeLinting } from '../purposes/linting/initializeLinting.js'
import { initializeESlint } from '../purposes/linting/eslint/bin/initialize.js'

export const options = {
  linting: {
    action: initializeLinting,
    eslint: {
      action: initializeESlint
    }
  }
}
