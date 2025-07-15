describe("Clear Session", () => {
	it("clears all sessions", () => {
		Cypress.session.clearAllSavedSessions();
	});
});
