Cypress.Commands.add('verifyDataOnWeb', (xpath, option) => {
  cy.get(xpath).each(($el, index) => {
    const elementName = $el.text();
    /* if(elementName==option){
            cy.log("I am in side the if");
            cy.expect(elementName).to.be.equal(option);
        } */
    if (cy.expect(elementName).to.be.equal(option)) {
    }
  });
});

Cypress.Commands.add('verifyDataOnWebForOutflow', (xpath, option) => {
  cy.get(xpath).each(($el, index) => {
    const elementName = $el.text();
    if (elementName == option) {
      cy.log('I am in side the if');
      cy.expect(elementName).to.be.equal(option);
    }
  });
});

Cypress.Commands.add('selectElementBasedOnIndexReturnString', (xpath, option) => {
  let found = false;
  cy.get(xpath).each(($el, index) => {
    if (index == option && !found) {
      cy.get($el)
        .text()
        .then(data => {
          found = true;
          return data;
        });
    }
  });
});
