Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, { username, password })
    .then(({ body }) => {
      localStorage.setItem('loggedBlogUser', JSON.stringify(body))
      cy.visit('')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
        url: `${Cypress.env('BACKEND')}/blogs`,
        method: 'POST',
        body: { title, author, url },
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
        }
    })
    cy.visit('')
})

Cypress.Commands.add('addUser', ({ username, password, name }) => {
  const user = {
    username: username,
    password: password,
    name: name
  }
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    .then(response => {
      cy.visit('')
    })
})