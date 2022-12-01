import { options } from './options.js'

export async function initActions(actions, framework) {
  actions.map((name) => options[name].action(framework))
}
