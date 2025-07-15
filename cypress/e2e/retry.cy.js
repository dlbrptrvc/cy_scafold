describe("Test Retry Suite", () => {
	const retries = 25; // Specify the number of retries

	Cypress._.times(retries, (i) => {
		it(
			"should log in successfully and navigate to the Dashboard" +
				" x" +
				(i + 1),
			() => {
				// Assuming the login command handles the login process
				cy.login(); // Uses defaultUser by default

				// Verify that the Dashboard page is visible
				cy.get("h1").contains("My Dashboard").should("be.visible");
			}
		);
	});
});
