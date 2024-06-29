describe('Blog app', function() {

    // beforeEach(function() {
    //         cy.visit('http://localhost:5173')
    //     })
      
    //     it('Login form is shown', function() {
    //       cy.contains('Blogs List Page')
    //       cy.contains('Login')
    //     })

        beforeEach(function() {
            cy.request('POST', 'http://localhost:3003/api/testing/reset')
            const user = {
                name: 'testuser',
                username: 'testuser',
                password: 'testuser'
            }
            cy.request('POST', 'http://localhost:3003/api/users/', user) 
            const user2 = {
                name: 'testuser2',
                username: 'testuser2',
                password: 'testuser2'
            }
            cy.request('POST', 'http://localhost:3003/api/users/', user2)
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

      
        describe('When logged in', function() {
            beforeEach(function() {
                cy.login({ username: 'testuser', password: 'testuser' })
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
                cy.get('.blogPost').eq(0).contains('view').click()
                cy.contains('Likes: 0')
                cy.contains('a Title created by cypress : a Author created by cypress').parent().find('#bloglikeBtn').as('likeButton')
                cy.get('@likeButton').click()
                cy.contains('Likes: 1')
            })

            it('A blog can be deleted', function() {
                cy.contains('Add New Blog').click()
                cy.get('#blogtitle').type('a Title created by cypress')
                cy.get('#blogauthor').type('a Author created by cypress')
                cy.get('#blogurl').type('a URL created by cypress')
                cy.get('#addblogBtn').click()
                cy.contains('a Title created by cypress : a Author created by cypress')
                cy.contains('Add New Blog').click()
                cy.contains('view').click()
                cy.get('#removeBlogBtn').click()
                cy.get('.blogPost').should('not.exist')
                
            })
        })

        describe('When logged in 2', function() {
            beforeEach(function() {
                cy.login({ username: 'testuser', password: 'testuser' })
            })
        
            it('A blog can be deleted by author', function() {
                cy.contains('Add New Blog').click()
                cy.get('#blogtitle').type('a Title created by cypress')
                cy.get('#blogauthor').type('a Author created by cypress')
                cy.get('#blogurl').type('a URL created by cypress')
                cy.get('#addblogBtn').click()
                cy.contains('a Title created by cypress : a Author created by cypress')
                cy.contains('Log Out').click()
                cy.login({ username: 'testuser2', password: 'testuser2' })
                cy.contains('view').click()
                cy.get('#removeBlogBtn').should('not.exist')

            })
        })

        describe('Like order', function() {
            beforeEach(function() {
                cy.login({ username: 'testuser', password: 'testuser' })
            })
        
            it('A blog can be deleted by author', function() {
                cy.contains('Add New Blog').click()
                cy.get('#blogtitle').type('a Title created by cypress')
                cy.get('#blogauthor').type('a Author created by cypress')
                cy.get('#blogurl').type('a URL created by cypress')
                cy.get('#addblogBtn').click()
                cy.contains('a Title created by cypress : a Author created by cypress')

                cy.contains('Add New Blog').click()
                cy.get('#blogtitle').type('a Title created by cypress 2')
                cy.get('#blogauthor').type('a Author created by cypress 2')
                cy.get('#blogurl').type('a URL created by cypress 2')
                cy.get('#addblogBtn').click()
                
                cy.get('.blogPost').eq(1).contains('view').click()
                cy.contains('a Title created by cypress 2 : a Author created by cypress 2').parent().find('#bloglikeBtn').as('likeButton')
                cy.get('@likeButton').click()
                cy.contains('Likes: 1')

                cy.get('.blogPost').eq(0).should('contain', 'a Title created by cypress 2 : a Author created by cypress 2')
                cy.get('.blogPost').eq(1).should('contain', 'a Title created by cypress : a Author created by cypress')
            })

           
        })

        
    
      
  })