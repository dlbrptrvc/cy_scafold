//Login
Cypress.Commands.add("login", (fixtureFileName = "defaultUser") => {
	// Visit the login page
	cy.visit("https://secure-ui-qa.mydirectives.com");

	// Load credentials from the specified fixture file
	cy.fixture(fixtureFileName).then((user) => {
		// Fill in the login form
		cy.get("#login-username", { timeout: 20000 }).put(user.username);
		cy.get("#login-pwd").put(user.password);

		// Submit the login form
		cy.get("#login-submit").click();
	});
});

//Continue with user session
Cypress.Commands.add("initSession", (fixtureFileName = "defaultUser") => {
	cy.fixture(fixtureFileName).then((user) => {
		cy.session(
			user.username, // Use the username from the fixture file as the session name
			() => {
				cy.login(fixtureFileName); // Pass the fixture file name to the login command

				// Wait until the "MyD.Secure.Auth" cookie is set
				cy.waitUntil(
					() =>
						cy.getCookie("MyD.Secure.Auth").then((cookie) => {
							return Boolean(cookie); // Returns true if the cookie exists
						}),
					{
						timeout: 10000, // Maximum time to wait for the cookie (10 seconds)
						interval: 500, // Check every 500ms
						errorMsg: "Authorization cookie was not set within 10 seconds", // Message to display if cookie is not found
					}
				);
			},
			{
				cacheAcrossSpecs: true,

				validate: () => {
					// Validate session by ensuring the cookie exists
					cy.getCookie("MyD.Secure.Auth").should("exist");
				},
			}
		);
	});

	// Navigate to the Dashboard page
	cy.visit("https://secure-ui-qa.mydirectives.com/Dashboard");
	cy.get("button.v-app-bar-nav-icon").should("be.visible");
});
