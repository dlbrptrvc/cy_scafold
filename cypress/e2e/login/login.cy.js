describe("Login Test", () => {
	it("should log in successfully and navigate to the Dashboard", () => {
		// Assuming the login command handles the login process
		cy.login(); // Uses defaultUser by default

		// Verify that the Dashboard page is visible
		cy.get("h1").contains("My Dashboard").should("be.visible");
	});
});
