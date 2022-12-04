describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    cy.get('h1').should('contain.text', 'Vite + React + Tailwind')
  })
})
