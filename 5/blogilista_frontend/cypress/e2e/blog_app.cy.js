describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'akuankka',
      password: 'ankansalasana',
      name: 'Aku Ankka'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('akuankka')
      cy.get('#password').type('ankansalasana')
      cy.get('#login-button').click()
      cy.contains('blogs')
    })
  
    it('fails with wrong credentials', function() {
      cy.get('#username').type('akuankka')
      cy.get('#password').type('roopensalasana')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('akuankka')
      cy.get('#password').type('ankansalasana')
      cy.get('#login-button').click()      
      cy.contains('create new blog').click()
      cy.get('#title-input').type('Tämä on blogi')
      cy.get('#author-input').type('Bloggaaja')
      cy.get('#url-input').type('www.blogi.com')
      cy.get('#submit-button').click()
    })

    it('a blog can be created', function() {
      cy.get('#blogListing').contains('Tämä on blogi')
    })

    it('a blog can be liked', function() {
      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.contains('1')
    })
  })
})