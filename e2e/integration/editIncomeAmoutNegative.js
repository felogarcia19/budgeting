import { splitStringInToChars } from '../../cypress/support/utils.js';

it('Edit Income Amount Negative', () => {
  // Go to app
  cy.visit("http://localhost:8000/budget");
  cy.wait(2000);
  // Get the actual Total Outflow amount
  cy.get("div.components-Balance-style__balanceRow > div:nth-child(1) > div.components-Balance-style__balanceItem > div.components-Balance-style__balanceAmount.components-Balance-style__pos").invoke('text').then((totalBeforePos)=>{
      let totalBeforePosFiltered = splitStringInToChars(totalBeforePos);
    cy.get("div.components-Balance-style__balanceRow > div:nth-child(3) > div.components-Balance-style__balanceItem > div.components-Balance-style__balanceAmount.components-Balance-style__neg").invoke('text').then((totalBeforeNeg)=>{
      var totalBeforeFilteredNeg = splitStringInToChars(totalBeforeNeg);
      cy.wait(1000);
          // Go to dropdown list / Select School
      cy.get("form > div.containers-EntryFormRow-style__formSection > select").select('15').should('have.value', '15');
      // Add Description
      cy.get("form > div:nth-child(2) > input").type("This is Income category");
      // Add value
      cy.get("form > div:nth-child(3) > input").type("1000");
          // Select ADD button
      cy.get("form > div:nth-child(4)  > button").click();
      cy.wait(1000);
          // Verify data in the table
      // Verify School :last-child
      cy.verifyDataOnWeb("table.containers-BudgetGrid-style__budgetGrid > tbody > tr:last-child >td:nth-child(1) > div:nth-child(2)", "Income");
      cy.wait(1000);
          // Verify description
      cy.verifyDataOnWeb("table.containers-BudgetGrid-style__budgetGrid > tbody > tr:last-child >td:nth-child(2) > div:nth-child(2)", "This is Income category");
      cy.wait(1000);
      // Verify Value
      cy.verifyDataOnWeb("table.containers-BudgetGrid-style__budgetGrid > tbody > tr:last-child >td:nth-child(3) > div:nth-child(2)", "$1,000.00");
          );
          cy.wait(1000);
          // Get the actual Total Outflow amount after adding new category
      cy.get("div.components-Balance-style__balanceRow > div:nth-child(1) > div.components-Balance-style__balanceItem > div.components-Balance-style__balanceAmount.components-Balance-style__pos").invoke('text').then((totalAfterPos)=>{
              var totalAfterFiltered = splitStringInToChars(totalAfterPos);
              cy.expect(parseInt(totalAfterFiltered)).to.be.greaterThan(parseInt(totalBeforePosFiltered));
        // Click on value field
        cy.get("table.containers-BudgetGrid-style__budgetGrid > tbody > tr:last-child >td:nth-child(3) > div:nth-child(2)").click();
        cy.wait(1000);
              // Erease the existing value on input
        for(let i=0; i<4; i++) {
          cy.get("table.containers-BudgetGrid-style__budgetGrid > tbody > tr:last-child > td > form > div:nth-child(3) > input").type("{backspace}");
          cy.wait(1000);
              }
        // Enter negative value
        cy.get("table.containers-BudgetGrid-style__budgetGrid > tbody > tr:last-child > td > form > div:nth-child(3) > input").type("-1000");
        cy.wait(1000);
              // Select Update
        cy.get("table.containers-BudgetGrid-style__budgetGrid > tbody > tr:last-child > td > form > div:nth-child(4) > button:nth-child(2)").click();
              cy.wait(1000);
        cy.get("div.components-Balance-style__balanceRow > div:nth-child(3) > div.components-Balance-style__balanceItem > div.components-Balance-style__balanceAmount.components-Balance-style__neg").invoke('text').then((totalAfterNeg)=>{
                  let totalAfterFilteredNeg = splitStringInToChars(totalAfterNeg);
          cy.expect(parseInt(totalAfterFilteredNeg)).to.be.greaterThan(parseInt(totalBeforeFilteredNeg));
          // Go to reports
          cy.get("div.components-Header-style__header > a:nth-child(2)").click();
                  cy.wait(2000);
          // Verify the amount at the Inflow bar is tha same after takeoff the value 
          cy.get("g.components-StackedChart-styles__xAxis > g:nth-child(1) > text.components-StackedChart-styles__value").invoke('text').then((totalAfterReports)=>{             
                      let totalAfterReportsFiltered = splitStringInToChars(totalAfterReports);
            cy.expect(parseInt(totalBeforePosFiltered)).to.be.equal(parseInt(totalAfterReportsFiltered));
          });
                });
      });
        });
  });
});
