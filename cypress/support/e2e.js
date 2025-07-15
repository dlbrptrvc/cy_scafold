import "@cypress/grep"; // Load cypress-grep
import "cypress-plugin-xhr-toggle"; // Load xhr-toggle
import "cypress-fill-command";
import "cypress-recurse/commands";
import "cypress-if";
import "cypress-file-upload";
import "cypress-wait-until";

import "./commands";

Cypress.on("uncaught:exception", (err, runnable) => {
	// Prevent Cypress from failing the test for specific errors
	if (
		err.message.includes(
			"ResizeObserver loop completed with undelivered notifications"
		)
	) {
		return false; // Returning false prevents the error from failing the test
	}
});
