describe('open modal and drag ingredients to constructor block', () => {
  it('should be aviable on https://localhost:300', () => {
    cy.visit('/')
  })

  it('should open modal and check title contains then close modal', () => {
    cy.get('#bunBlock').find('h3').should('have.text', 'Булки')
    cy.get('#bunBlock').find('a').first().click()
    cy.wait(1000)
    cy.get('#root-modal').find('h2').should('have.text', 'Детали ингредиента')
    cy.get('#root-modal').find('[data-testid=titleIngredient]').should('have.text', 'Краторная булка N-200i')
    cy.get('#root-modal').find('svg').click()

    cy.get('#sauceBlock').find('h3').should('have.text', 'Соусы')
    cy.get('#sauceBlock').find('a').last().click()
    cy.wait(1000)
    cy.get('#root-modal').find('h2').should('have.text', 'Детали ингредиента')
    cy.get('#root-modal').find('[data-testid=titleIngredient]').should('have.text', 'Соус с шипами Антарианского плоскоходца')
    cy.get('#root-modal').find('svg').click()

    cy.get('#mainBlock').find('h3').should('have.text', 'Начинки')
    cy.get('#sauceBlock').find('a:nth-child(2)').click()
    cy.wait(1000)
    cy.get('#root-modal').find('[data-testid=titleIngredient]').should('have.text', 'Соус фирменный Space Sauce')
    cy.get('#root-modal').find('svg').click()
    // cy.get('main.custom-scroll').scrollTo('top')
  })

  it('should drag item to constructor block', () => {
    cy.get('[data-testid=tabs]').find('span').first().should('have.text', 'Булки').click()
    cy.get('#bunBlock').find('a').first().trigger('dragstart')
    cy.get('[data-testid=dropBun]').trigger('drop')

    cy.get('[data-testid=tabs]').find('.noselect:nth-child(2)').should('have.text', 'Соусы').click()
    cy.get('#sauceBlock').find('a:nth-child(2)').trigger('dragstart')
    cy.get('[data-testid=dropIngredient]').trigger('drop')
    cy.get('#sauceBlock').find('a:nth-child(2)').trigger('dragstart')
    cy.get('[data-testid=dropIngredient]').trigger('drop')

    cy.get('#sauceBlock').find('a:nth-child(4)').trigger('dragstart')
    cy.get('[data-testid=dropIngredient]').trigger('drop')

    cy.get('#mainBlock').find('a:nth-child(1)').trigger('dragstart')
    cy.get('[data-testid=dropIngredient]').trigger('drop')
    cy.get('#mainBlock').find('a:nth-child(5)').trigger('dragstart')
    cy.get('[data-testid=dropIngredient]').trigger('drop')
  })

  it('should click on button for order', () => {
    cy.get('button').contains('Оформить заказ').click()
  })

  it('should log in user', () => {
    cy.get('[data-testid=login]').find('h2').should('have.text', 'Вход')
    cy.get('[data-testid=login]').find('.input__icon-action').first().click().type('dared83735@d3ff.com')
    cy.get('[data-testid=login]').find('.input_type_password').last().click().type('1234567')
    cy.get('[data-testid=login]').find('button').click()
  })

  it('should checkout order', () => {
    cy.wait(1000)
    cy.get('button').contains('Оформить заказ').click()
    cy.wait(20000)
    cy.get('#root-modal').find('svg').click()
  })
})
