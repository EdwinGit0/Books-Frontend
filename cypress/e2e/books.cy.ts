describe('Books', () => {
  it('can list, show, create, edit and delete books', () => {
    //List books
    cy.visit('/')
    .get('[data-cy="link-to-books"]').click()

    // Create books
    cy.get('[href="/libros/crear"]').click()
    .get('[data-cy="input-book-title"]')
    .type('New book from cypress')
    .get('[data-cy="button-submit-book"]')
    .click()
    .get('[data-cy="book-list"]')
    .contains('New book from cypress')

    //Show book
    cy.get('[data-cy^="link-to-visit-book-"]')
    .last()
    .click()
    .get('h1')
    .should('contain.text', 'New book from cypress')
    .get('[href="/libros"]').click()

    //Edit book
    cy.get('[data-cy^="link-to-edit-book-"]')
    .last()
    .click()
    .get('[data-cy="input-book-title"]')
    .clear()
    .type('Book edited by cypress')
    .get('[data-cy="button-submit-book"]')
    .click()
    .get('[data-cy="book-list"]')
    .contains('Book edited by cypress')
    
    //Delete Book
    cy.get('[data-cy^="link-to-delete-book-"]')
    .last()
    .click()
    .wait(3000)
    .get('[data-cy^="link-to-visit-book-"]')
    .last().should('not.contain.text', 'Book edited by cypress')
  })
})