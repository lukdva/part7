describe('Blog app', function() {

  beforeEach(function() {
    this.username = 'cypress_e2e'
    this.password = 'admin'
    this.name = 'Cypress Tester'
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', { 'username':this.username, 'password':this.password, 'name':this.name })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.findByTestId('login_form').should('be.visible')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.findByTestId('username').type(this.username)
      cy.findByTestId('password').type(this.password)
      cy.findByTestId('login_button').click()
      cy.findByTestId('notification')
        .should('be.visible')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.text', 'Login successful')
    })

    it('fails with wrong credentials', function() {
      cy.findByTestId('username').type(this.username)
      cy.findByTestId('password').type('wabalabadubdub')
      cy.findByTestId('login_button').click()
      cy.findByTestId('notification')
        .should('be.visible')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.text', 'Request failed with status code 401')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: this.username, password: this.password })
    })

    it('A blog can be created', function() {
      const title = 'Title'
      const author = 'Author'
      const url = 'localhost:3000'
      cy.contains('new note').click()
      cy.findByTestId('title_input').type(title)
      cy.findByTestId('author_input').type(author)
      cy.findByTestId('url_input').type(url)
      cy.findByTestId('create_button').click()
      cy.findByTestId('notification')
        .should('be.visible')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.text', 'Blog created successfully')
      cy.findByTestId('blog_list').should('contain', `${title} ${author}`)
    })

    describe('When blog is created', function() {
      beforeEach(function() {
        this.title = 'Making Scotch Blend'
        this.author = 'Johnie Walker'
        this.url = 'www.johny.com'
        this.likes = 0
        cy.addNewBlog({ title: this.title, author: this.author , url: this.url, likes: this.likes})
      })
      it('A blog can be liked', function() {
        cy.contains(`${this.title} ${this.author}`).parent().as('blog')
        cy.get('@blog').findByTestId('blog_details_view_button').click()
        cy.get('@blog').findByTestId('blog_like_button').click()
        cy.get('@blog').findByTestId('blog_likes').should('contain', `likes ${this.likes + 1}`)
      })
      it('A blog can be deleted by user who created it', function() {
        cy.contains(`${this.title} ${this.author}`).parent().as('blog')
        cy.get('@blog').findByTestId('blog_details_view_button').click()
        cy.on('window:confirm', (str) => {
          expect(str).to.eq(`Remove blog "${this.title}" by ${this.author}`)
          return true
        })
        cy.get('@blog').findByTestId('remove_button').should('be.visible').click()
        cy.contains(`${this.title} ${this.author}`).should('not.exist')
      })
      it('A blog can not be deleted by other user', function() {
        const username = 'other_cypress_user'
        const password = 'admin'
        const name = 'Other Cypress Tester'
        cy.logout()
        cy.addNewUser({ username, password, name })
        cy.login({ username, password })
        cy.contains(`${this.title} ${this.author}`).parent().as('blog')
        cy.get('@blog').findByTestId('blog_details_view_button').click()
        cy.get('@blog').findByTestId('remove_button').should('not.exist')
      })
      it('Blogs are ordered in correct order initially and after changing number of likes', function() {
        const titleFirstBlog = 'Blog with most likes'
        const authorFirstBlog = 'John Doe'
        const urlFirstBlog = 'www.likes.com'
        const likesFirstBlog = 99
        cy.addNewBlog({ title: titleFirstBlog, author: authorFirstBlog , url: urlFirstBlog, likes: likesFirstBlog })
        const titleSecondBlog = 'Blog with 2nd most likes'
        const authorSecondBlog = 'John Doe'
        const urlSecondBlog = 'www.likes.com'
        const likesSecondBlog = 1
        cy.addNewBlog({ title: titleSecondBlog, author: authorSecondBlog , url: urlSecondBlog, likes: likesSecondBlog })
        const titleLastBlog = this.title
        const authorLastBlog = this.author
        const likesLastBlog = this.likes // 0

        cy.findAllByTestId('blog_info').eq(0).should('contain', titleFirstBlog)
        cy.findAllByTestId('blog_info').eq(1).should('contain', titleSecondBlog)
        cy.findAllByTestId('blog_info').eq(2).should('contain', titleLastBlog)

        cy.contains(`${titleLastBlog} ${authorLastBlog}`).parent().as('lastBlog')
        cy.get('@lastBlog').findByTestId('blog_details_view_button').click()
        cy.get('@lastBlog').findByTestId('blog_like_button').click()
        cy.get('@lastBlog').findByTestId('blog_likes').should('contain', `likes ${likesLastBlog + 1}`)
        cy.get('@lastBlog').findByTestId('blog_like_button').click()
        cy.get('@lastBlog').findByTestId('blog_likes').should('contain', `likes ${likesLastBlog + 2}`)
        cy.findAllByTestId('blog_info').eq(0).should('contain', titleFirstBlog)
        cy.findAllByTestId('blog_info').eq(1).should('contain', titleLastBlog)
        cy.findAllByTestId('blog_info').eq(2).should('contain', titleSecondBlog)
      })
    })
  })
})
