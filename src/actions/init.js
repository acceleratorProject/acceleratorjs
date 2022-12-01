import { options } from './options.js'

export async function initActions(params) {
  params.map((name) => options[name].action('none'))
}
