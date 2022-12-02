import { options } from './options.js'

export async function initActions(actions) {
  actions?.map((name) => options[name].action())
}
