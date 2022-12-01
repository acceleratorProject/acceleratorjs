export function getStyleGuideName(answers) {
  if (answers.styleguide === 'airbnb' && answers.framework !== 'react') {
    return 'airbnb-base'
  }
  return answers.styleguide
}
