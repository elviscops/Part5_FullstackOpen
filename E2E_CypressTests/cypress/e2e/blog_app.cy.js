describe('Blog app', function() {
    beforeEach(function() {
      cy.visit('http://localhost:5173')
    })
  
    it('Login form is shown', function() {
      cy.contains('Blogs List Page')
      cy.contains('Login')
    })

  
      
  })