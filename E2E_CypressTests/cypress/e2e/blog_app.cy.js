describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'testuser',
            username: 'testuser',
            password: 'testuser'
        }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173')
    })
  
    it('Login form is shown', function() {
      cy.contains('Blogs List Page')
      cy.contains('Login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testuser')
            cy.get('#password').type('testuser')
            cy.get('#loginButton').click()
            cy.contains('testuser has been logged in:')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('wronguser')
            cy.get('#password').type('wronguser')
            cy.get('#loginButton').click()
            
            cy.get('.notificationNegative').should('contain', 'Wrong username or password') 
            cy.get('.notificationNegative').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('.notificationNegative').should('have.css', 'border-style', 'solid')
        })
        }) 
  
      
  })