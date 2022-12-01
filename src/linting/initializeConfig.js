import { promptUser } from './promptUser.js'

export function initializeConfig(framework) {
  return promptUser(framework)
}
