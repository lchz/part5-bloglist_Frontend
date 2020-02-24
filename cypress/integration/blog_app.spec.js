
describe('Blog app', function () {
  beforeEach(function () {

    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Test User',
      username: 'test',
      password: 'test'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })



  it('Login form is shown', function () {
    cy.contains('Log in').click()
    cy.contains('Log in to application')

  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })


    it('fails with wrong credentials', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Log in').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Testing by Cypress')
      cy.get('#author').type('Testing Author')
      cy.get('#url').type('http://testtest')
      cy.get('#create-button').click()
      cy.contains('Testing by Cypress')
    })
  })

})