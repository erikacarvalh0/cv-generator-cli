const inquirer = require("inquirer")
const chalk = require("chalk")

const { logTitle, logConfirmation, logDivider } = require("./helpers/logs")

const { header, secondaryColor, questions, choices } = require('./vars')
const { getSectionContent } = require('./section')

const hasPersonalInfos = header.personalInfos.some(info => info)
let isFirstEdition = true

const endHeader = () => {
	logConfirmation(`\nYAY! Your header infos were added!`)
	logDivider()

	setTimeout(getSectionContent, 800)
}

const confirmAddNew = (next, info) => {
	header.personalInfos.push(info)
	
	inquirer.prompt([{
		type: "confirm",
		name: "addNewInfo",
		message: questions.addNewInfo,
	}])
		.then(({ addNewInfo }) => {
				if ( addNewInfo ) {
					logDivider()
					next()
				} else {
						endHeader()
				}
		});
}

const getPersonalInfos = () => {
	const info = {}

	inquirer.prompt([
		{
			type: "list",
			name: "infoType",
			message: questions.infoType,
			choices: choices.infoType,
		}
	])
	.then(({ infoType }) => {
		info.type = infoType

		inquirer.prompt([{
			type: "input",
			name: "infoContent",
			message: questions.infoContent,
		}])
		.then(({ infoContent }) => {
			info.content = infoContent

			if (infoType.includes("Link")) {
				inquirer.prompt([{
					type: "input",
					name: "linkHref",
					message: questions.linkHref,
				}])
				.then(({ linkHref }) => {
					info.href = linkHref
					confirmAddNew(getPersonalInfos, info)
				});
			} else {
				confirmAddNew(getPersonalInfos, info)
			}
		});
	});

}

const promptDivider = () => {
	inquirer.prompt([
		{
			type: "confirm",
			name: "divider",
			message: questions.divider,
		}
	])
	.then(({ divider }) => {
		header.divider = divider
		if (hasPersonalInfos) {
			promptConfirmInfos()
		} else {
			getPersonalInfos()
		}
	});
}

const personalInfosIntro = () => {
	logTitle("Personal Infos", "Now let's set some personal infos. We recommend that you add infos like your location, email, github profile or any interesting link or info about you.")
	promptDivider()
}

const getImageAlt = (imageUrl) => {
	inquirer.prompt([{
		type: "input",
		name: "imageAlt",
		message: questions.imageAlt,
	}])
	.then(({ imageAlt }) => {
		if ( imageAlt ) {
			header.alt = imageAlt
			logConfirmation(`Cool! Your image ${imageUrl} will have the alt attribute "${imageAlt}"`)
			logDivider()
		}

		if (hasPersonalInfos) {
			promptConfirmInfos()
		} else {
			setTimeout(personalInfosIntro, 800)
		}
	});
}

const checkImageUrl = (imageUrl) => {
	if (!imageUrl.includes('http')) {
		inquirer.prompt([{
			type: "confirm",
			name: "validUrl",
			message: questions.validUrl,
	}])
	.then(({ validUrl }) => {
		if ( validUrl ) {
			header.image = imageUrl

			if (header.alt) {
				promptConfirmInfos()
			} else {
				getImageAlt(imageUrl)
			}
		} else {
			addImage(imageUrl)
		}
	});	
}}

const addImage = () => {
	inquirer.prompt([{
		type: "input",
		name: "imageUrl",
		message: questions.imageUrl,
	}])
	.then(({ imageUrl }) => {
		if ( imageUrl ) {
			checkImageUrl(imageUrl)
		} else {
			logConfirmation("Ok, we have more infos to fill :)\n")
			logDivider()
		}
	});
}

const hasHeaderInfo = () => {
	return !!header?.image || !!header?.alt || hasPersonalInfos
}

const showFilledInfos = () => {
	if (header.image) {
		console.log(secondaryColor(chalk.bold("Image URL: ")), header.image)
	}

	if (header.alt) {
		console.log(secondaryColor(chalk.bold("Image alt text: ")), header.alt)
	}

	if (header.divider) {
		console.log(secondaryColor(chalk.bold("Want a divider? ")), header.divider)
	}

	if (hasPersonalInfos) {
		header.personalInfos.map(info => 
			console.log(secondaryColor(chalk.bold("Personal info: ")), info.content)	
		)
	}
	console.log("\n")
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
						name: "editHeader",
						message: questions.infoToEdit,
						choices: choices.editHeader,
					}
				])
				.then(({ editHeader }) => {
					isFirstEdition = false
					redirectToPrompt(editHeader)
				});
			} else {
				setTimeout(endHeader, 800)
			}
		});
}

const promptEditPersonalInfos = (infoToEdit) => {
	const index = infoToEdit.includes("Location")
		? 0
		: infoToEdit.includes("Email")
			? 1
			: 2
		
	const question = infoToEdit.includes("Location")
		? questions.editLocation
		: infoToEdit.includes("Email")
			? questions.editEmail
			: questions.editProfile

	inquirer.prompt([{
		type: "input",
		name: "infoContent",
		message: question,
	}])
	.then(({ infoContent }) => {
		header.personalInfos[index].content = infoContent

		if (header.personalInfos[index]?.href) {
			header.personalInfos[index].href = infoContent
		}

		promptConfirmInfos()
	});
}

const redirectToPrompt = (infoToEdit) => {
	if (infoToEdit.includes("URL")) {
		inquirer.prompt([{
			type: "input",
			name: "imageUrl",
			message: questions.imageUrl,
		}])
		.then(({ imageUrl }) => {
			if ( imageUrl ) {
				checkImageUrl(imageUrl, true)
			} else {
				logConfirmation("Ok, we have more infos to fill :)\n")
				logDivider()
			}
		});
	} else if (infoToEdit.includes("alt")) {
		getImageAlt(header.image)
	} else if (infoToEdit.includes("Divider")) {
		promptDivider()
	} else  if (infoToEdit.includes("Nothing")) {
		endHeader()
	} else {
		promptEditPersonalInfos(infoToEdit)
	}
}

exports.getHeaderInfos = () => {
	if (hasHeaderInfo()) {
		logTitle("Header", "Let's check the infos you provided!")

		showFilledInfos()
		promptConfirmInfos()
		
	} else {
		logTitle("Header", "First, you need to fill the header infos.")
	
		inquirer.prompt([{
			type: "confirm",
			name: "wantImage",
			message: questions.wantImage,
		}])
			.then(({ wantImage }) => {
				if ( wantImage ) {
					addImage()
				} else {
					logConfirmation("Ok, we have more infos to fill :)\n")
					logDivider()
	
					setTimeout(personalInfosIntro, 800)
				}
			});
	}
}

