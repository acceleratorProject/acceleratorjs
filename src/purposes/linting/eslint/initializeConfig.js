import { promptUser } from './promptUser.js'

export function initializeConfig() {
  return promptUser()
}
