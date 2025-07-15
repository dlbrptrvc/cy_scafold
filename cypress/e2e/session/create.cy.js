describe("Init Session", () => {
	it("initialize a session", () => {
		cy.initSession();
		cy.get("h1").contains("My Dashboard");
	});
});
