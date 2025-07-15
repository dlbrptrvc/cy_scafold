describe("Fetch emails", () => {
	it.only("Fetch latest email", () => {
		cy.getSMS().then((SMStext) => {
			cy.log(SMStext);
		});
	});
});
