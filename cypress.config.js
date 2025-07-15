const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const grep = require("@cypress/grep/src/plugin");

module.exports = defineConfig({
	experimentalModifyObstructiveThirdPartyCode: true,
	e2e: {
		baseUrl: "https://qa2.mydirectives.com",
		downloadsFolder: "C:\\CYPRESS_FILES\\download",
		chromeWebSecurity: false,

		setupNodeEvents(on, config) {
			grep(config); // Add cypress-grep support
			// Adding an env variable to store the downloads folder address
			console.log("Download folder path:", config.downloadsFolder);
			config.env.DOWNLOAD_DIR = config.downloadsFolder;

			on("task", {
				// Custom task to delete a file
				deleteFile(filePath) {
					try {
						const fullPath = path.resolve(filePath);
						if (fs.existsSync(fullPath)) {
							fs.unlinkSync(fullPath); // Delete the file
							return { success: true };
						}
						return { success: false, message: "File does not exist" };
					} catch (error) {
						return { success: false, message: error.message };
					}
				},
				// Custom task to find files matching a prefix and extension
				findMatchingFiles({ dirPath, fileName, extension }) {
					try {
						const files = fs.readdirSync(dirPath); // Read all files in the directory
						const matchingFiles = files
							.filter(
								(file) =>
									file.startsWith(fileName) && file.endsWith(`.${extension}`)
							)
							.map((file) => path.join(dirPath, file)); // Return full paths
						return matchingFiles;
					} catch (error) {
						return [];
					}
				},
				// Custom task to check for file existence
				doesFileExist(filePath) {
					return new Promise((resolve) => {
						resolve(fs.existsSync(filePath));
					});
				},
				// Custom task to read a file
				readFile(filePath) {
					return new Promise((resolve, reject) => {
						fs.readFile(filePath, { encoding: "binary" }, (err, data) => {
							if (err) {
								return reject(err);
							}
							resolve(data);
						});
					});
				},
				// Custom task to read PDF content
				readPdfContent(filePath) {
					console.log("\n\n===== STARTING PDF READING TASK =====\n\n");
					console.log("Attempting to read PDF file at:", filePath);

					try {
						const fileBuffer = fs.readFileSync(filePath);
						console.log(
							"File read successfully. Size:",
							fileBuffer.length,
							"bytes"
						);

						return pdf(fileBuffer)
							.then((data) => {
								console.log("PDF content extracted successfully.");
								console.log("Extracted text:", data.text);
								return data.text;
							})
							.catch((error) => {
								console.error("Error extracting PDF content:", error);
								return null;
							});
					} catch (readError) {
						console.error("Error reading PDF file:", readError);
						return null;
					}
				},
			});

			return config;
		},
	},
	env: {
		UPLOAD_DIR: "C:\\CYPRESS_FILES\\upload",
	},
});
