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
  
    describe('Blog app', function() {        
        describe('When logged in', function() {
            beforeEach(function() {
                cy.request('POST', 'http://localhost:3003/api/login', {
                    username: 'testuser',
                    password: 'testuser'
                  }).then(response => {
                    localStorage.setItem('loggedInUser', JSON.stringify(response.body))
                    cy.visit('http://localhost:5173')
                  })
            })

            
        
            it('A blog can be created', function() {
                cy.contains('Add New Blog').click()
                cy.get('#blogtitle').type('a Title created by cypress')
                cy.get('#blogauthor').type('a Author created by cypress')
                cy.get('#blogurl').type('a URL created by cypress')
                cy.get('#addblogBtn').click()
                cy.contains('a Title created by cypress : a Author created by cypress')
            })

            it('A blog can be liked', function() {
                cy.contains('Add New Blog').click()
                cy.get('#blogtitle').type('a Title created by cypress')
                cy.get('#blogauthor').type('a Author created by cypress')
                cy.get('#blogurl').type('a URL created by cypress')
                cy.get('#addblogBtn').click()
                cy.contains('a Title created by cypress : a Author created by cypress')

                cy.contains('Add New Blog').click()
                cy.contains('view').click()
                cy.contains('Likes: 0')
                cy.get('#bloglikeBtn').click()

                cy.contains('Likes: 1')
                
            })
        })
        
        })
      
  })