import { initializeESlint } from '../purposes/linting/eslint/bin/initialize.js'
import { initializeLinting } from '../purposes/linting/initializeLinting.js'

export const options = {
  linting: {
    action: initializeLinting,
    eslint: {
      action: initializeESlint
    }
  }
}
