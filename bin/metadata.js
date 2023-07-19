const chalk = require('chalk')
const inquirer = require('inquirer')

const { questions, choices, metadata, secondaryColor } = require('./vars');
const { logTitle, logConfirmation } = require('./helpers/logs');

const { callGenerate } = require('./generate')

let isFirstEdition = true

const endMetadata = () => {
	logConfirmation(`\nWe have everything we need to generate your CV now!\n\n`)
	callGenerate()
}

const promptCVTheme = (next) => {
	inquirer.prompt([{
		type: "input",
		name: "promptTheme",
		message: questions.cvTheme,
	},])
	.then(({ promptTheme }) => {
		metadata.theme = promptTheme
		if (!metadata.id) {
			promptCVId()
		} else if (!metadata.language) {
			promptCVLanguage()
		} else {
			if (next) {
				next()
			} else {
				endMetadata()
			}
		}
	});
}
const promptCVId = (next) => {
	inquirer.prompt([{
		type: "input",
		name: "promptId",
		message: questions.cvId,
	},])
	.then(({ promptId }) => {
		metadata.id = promptId
		if (!metadata.theme) {
			promptCVTheme()
		} else if (!metadata.language) {
			promptCVLanguage()
		} else {
			if (next) {
				next()
			} else {
				endMetadata()
			}
		}
	});
}

const promptCVLanguage = (next) => {
	inquirer.prompt([{
		type: "input",
		name: "promptLanguage",
		message: questions.cvLanguage,
	},])
	.then(({ promptLanguage }) => {
		metadata.language = promptLanguage

		if (!metadata.id) {
			promptCVId()
		} else if (!metadata.theme) {
			promptCVTheme()
		} else {
			if (next) {
				next()
			} else {
				endMetadata()
			}
		}
	});
}

const showFilledInfos = () => {
	if (metadata.id) {
		console.log(secondaryColor(chalk.bold("CV identifier: ")), metadata.id)
	}

	if (metadata.theme) {
		console.log(secondaryColor(chalk.bold("CV theme: ")), metadata.theme)
	}

	if (metadata.language) {
		console.log(secondaryColor(chalk.bold("CV language: ")), metadata.language)
	}

	console.log("\n")
}

const redirectToPrompt = (editInfo) => {
	if (editInfo.includes('Language')) {
		promptCVLanguage(promptConfirmInfos)
	}
	if (editInfo.includes('Theme')) {
		promptCVTheme(promptConfirmInfos)
	}
	if (editInfo.includes('Identifier')) {
		promptCVId(promptConfirmInfos)
	}
}

const promptConfirmInfos = () => {
	inquirer.prompt([{
		type: "confirm",
		name: "editInfos",
		message: isFirstEdition ? questions.editInfos : questions.editInfosMore,
	}])
		.then(({ editInfos }) => {
			if ( editInfos ) {
				inquirer.prompt([
					{
						type: "list",
						name: "editInfo",
						message: questions.infoToEdit,
						choices: choices.editMetadata,
					}
				])
				.then(({ editInfo }) => {
					if (!editInfo.includes('Nothing')) {
						isFirstEdition = false
						redirectToPrompt(editInfo)
					} else {
						setTimeout(endMetadata, 800)
					}
				});
			} else {
				setTimeout(endMetadata, 800)
			}
		});
}

exports.getCVMetadata = () => {
	console.log('metadata', metadata)
	if (metadata?.id || metadata?.theme || metadata?.language) {
		logTitle("Metadata", "You already provided some metadata for your CV:")
		showFilledInfos()

		setTimeout(promptConfirmInfos, 500)
	} else {
		logTitle("Metadata", "Let's add some metadata for your CV files, please.")

		if (!theme) {
			promptCVTheme()
		} else if (!id) {
			promptCVId()
		} else if (!language) {
			promptCVLanguage()
		}
	}
}