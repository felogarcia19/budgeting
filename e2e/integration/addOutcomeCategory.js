import { splitStringInToChars } from '../../cypress/support/utils.js';

it('Add Income Category', () => {
  // Go to app
  cy.visit('http://localhost:8000/budget');
  cy.wait(2000);
  // Get the actual Total Outflow amount
  cy.get(
    'div.components-Balance-style__balanceRow > div:nth-child(3) > div.components-Balance-style__balanceItem > div.components-Balance-style__balanceAmount.components-Balance-style__neg'
  )
    .invoke('text')
    .then(totalBefore => {
      const totalBeforeFiltered = splitStringInToChars(totalBefore);
      cy.wait(1000);
      // Go to dropdown list / Select School
      cy.get('form > div.containers-EntryFormRow-style__formSection > select')
        .select('11')
        .should('have.value', '11');
      // Add Description
      cy.get('form > div:nth-child(2) > input').type('This is Taxes category');
      // Add value
      cy.get('form > div:nth-child(3) > input').type('1000');
      // Select ADD button
      cy.get('form > div:nth-child(4)  > button').click();
      cy.wait(1000);
      // Verify data in the table
      // Verify School
      cy.verifyDataOnWeb(
        'table.containers-BudgetGrid-style__budgetGrid > tbody > tr:last-child >td:nth-child(1) > div:nth-child(2)',
        'Taxes'
      );
      cy.wait(1000);
      // Verify description
      cy.verifyDataOnWeb(
        'table.containers-BudgetGrid-style__budgetGrid > tbody > tr:last-child >td:nth-child(2) > div:nth-child(2)',
        'This is Taxes category'
      );
      cy.wait(1000);
      // Verify Value
      cy.verifyDataOnWeb(
        'table.containers-BudgetGrid-style__budgetGrid > tbody > tr:last-child >td:nth-child(3) > div:nth-child(2)',
        '-$1,000.00'
      );
      cy.wait(1000);
      // Get the actual Total Outflow amount after adding new category
      cy.get(
        'div.components-Balance-style__balanceRow > div:nth-child(3) > div.components-Balance-style__balanceItem > div.components-Balance-style__balanceAmount.components-Balance-style__neg'
      )
        .invoke('text')
        .then(totalAfter => {
          const totalAfterFiltered = splitStringInToChars(totalAfter);
          cy.expect(parseInt(totalAfterFiltered)).to.be.greaterThan(parseInt(totalBeforeFiltered));
          // Go to reports
          cy.get('div.components-Header-style__header > a:nth-child(2)').click();
          // Verify the amount at the green bar
          cy.get(
            'g.components-StackedChart-styles__xAxis > g:nth-child(2) > text.components-StackedChart-styles__value'
          )
            .invoke('text')
            .then(totalAfterReports => {
              const totalAfterReportsFiltered = splitStringInToChars(totalAfterReports);
              cy.expect(parseInt(totalAfterReportsFiltered)).to.be.greaterThan(parseInt(totalBeforeFiltered));
            });
        });
    });
});
