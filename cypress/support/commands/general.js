//Custom type/fill command
Cypress.Commands.add(
	"put",
	{ prevSubject: "element" },
	(subject, text, delay = 10) => {
		if (delay < 10) {
			// Use .invoke('val') for instantaneous typing
			cy.wrap(subject).invoke("val", text).trigger("input");
		} else {
			// Use cy.type() with the specified delay
			cy.wrap(subject).type(text, { delay });
		}
	}
);
