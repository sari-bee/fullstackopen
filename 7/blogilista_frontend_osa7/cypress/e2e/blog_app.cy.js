describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.addUser({
      username: 'akuankka',
      password: 'ankansalasana',
      name: 'Aku Ankka',
    })
    cy.addUser({
      username: 'roopeankka',
      password: 'roopensalasana',
      name: 'Roope Ankka',
    })
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('akuankka')
      cy.get('#password').type('ankansalasana')
      cy.get('#login-button').click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('akuankka')
      cy.get('#password').type('roopensalasana')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'akuankka', password: 'ankansalasana' })
    })

    it('a blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('Tämä on blogi')
      cy.get('#author-input').type('Bloggaaja')
      cy.get('#url-input').type('www.blogi.com')
      cy.get('#submit-button').click()
      cy.get('#blog-listing').contains('Tämä on blogi')
    })

    describe('When a blog has been added', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Tämä on blogi',
          author: 'Bloggaaja',
          url: 'www.blogi.com',
        })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.get('#like-button').click()
        cy.contains('1')
      })

      it('it can be removed', function () {
        cy.contains('view').click()
        cy.get('#delete-button').click()
        cy.get('#blog-listing').contains('Tämä on blogi').should('not.exist')
      })

      it('remove button is only shown to the user that added the blog', function () {
        cy.get('#logout-button').click()
        cy.login({ username: 'roopeankka', password: 'roopensalasana' })
        cy.contains('view').click()
        cy.get('#delete-button').should('not.exist')
      })

      it('blogs are sorted according to likes', function () {
        cy.createBlog({
          title: 'Elämää Mikin kanssa',
          author: 'Hessu Hopo',
          url: 'www.hopo.fi',
        })
        cy.createBlog({
          title: 'Elämää Hessun kanssa',
          author: 'Mikki Hiiri',
          url: 'www.mikki.fi',
        })
        cy.get('.blogStyle').eq(0).contains('Tämä on blogi')
        cy.get('.blogStyle').eq(1).contains('Elämää Mikin kanssa')
        cy.get('.blogStyle').eq(1).contains('view').click()
        cy.get('.blogStyle').eq(1).contains('like').click()
        cy.get('.blogStyle').eq(0).contains('like').click()
        cy.get('.blogStyle').eq(2).contains('view').click()
        cy.get('.blogStyle').eq(2).contains('like').click()
        cy.get('.blogStyle').eq(0).contains('Elämää Mikin kanssa')
        cy.get('.blogStyle').eq(1).contains('Elämää Hessun kanssa')
      })
    })
  })
})
