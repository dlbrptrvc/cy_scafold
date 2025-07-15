Cypress.Commands.add("getSMS", (smsText = "", mobileNumber = "14043833639") => {
	cy.request({
		url: "https://www.spoofbox.com/ajax.php?task=trashmobile-receive",
		method: "POST",
		body: { number: mobileNumber },
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			Accept: "text/html",
			"X-Requested-With": "XMLHttpRequest",
			Referer: "https://www.spoofbox.com/en/tool/trash-mobile",
			Cookie:
				"PHPSESSID=b606uq3e9j0gelmnra1cd2eu3k; cf_clearance=NU5z01xbmOr9MvDnvVexvv7U.lEW_4wt60qla58OfLU-1733318781-1.2.1.1-0_pNsU5qjh1xm9Duy1Ij3Nu8Wnvj7jDr3ZdFdX3VIdyxlYYaxzSMl1C6zsPt2DHPJFIO2pzLOmHE3Mhi.n9aeJQjXTFr83VlZMMA8KH85HMM17RXsSafHMpdDJZHh_hfTR2YucIz7rnpEVx7_tbazQw.grXvwIriLMjVX4AUsL3Kr6awxUCcD31ridLAwuZuMCJ0vkPxeZSGOPCsJd8.RWtCMMz3wA6n2soxc_.BZMrZgznouPETl6N7ynsZ8tsHWwp5_AOf1N9D9fKIQcM_Fn9dWtXWcxfdT4TqIlFlA_5_8UuktpIKCT4ojrAf.uE1O7z8Keu_23uwmo6fwpruHDKE.3A0s7qXwc8kv8RvXIDJ7rNavMvYsQTVSG9VSJLp",
		},
	}).then((response) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(response.body, "text/html");

		// Find all div elements
		const divs = doc.querySelectorAll("div");

		let foundDiv = null;
		// Iterate through the divs and check their text content
		divs.forEach((div) => {
			if (div.textContent.trim().includes(smsText) && foundDiv === null) {
				foundDiv = div;
			}
		});

		// Use the found div text for later
		if (foundDiv) {
			const foundText = foundDiv.textContent.trim();
			console.log("Found div text:", foundText);
			return foundText; // Return the found text here
		} else {
			console.log(`No div found containing the text: "${smsText}"`);
			return null; // Return null if no div is found
		}
	});
});
