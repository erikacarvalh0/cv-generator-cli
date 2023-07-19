const inquirer = require("inquirer")
const chalk = require("chalk")

const { logTitle, logConfirmation, logDivider } = require("./helpers/logs")

const { data, secondaryColor, questions, choices } = require('./vars')
const { getCVMetadata } = require('./metadata')

let isFirstEdition = true
const hasDataInfo = data[0].some(info => !!info)

const endSection = (section) => {
	data[0].push(section)
	
	console.log(`We are almost finished, I swear! :)`)
	
	setTimeout(getCVMetadata, 500)
}

const promptList = (next, section) => {
	inquirer.prompt([
		{
				type: "input",
				name: "sectionTitle",
				message: questions.sectionTitle,
		},
		{
			type: "list",
			name: "sectionType",
			message: questions.sectionType,
			choices: choices.sectionType,
		}
	])
	.then(({ sectionTitle, ...answers}) => {
		section.title = sectionTitle

		if (next) {
			next(answers)
		}
			
	});
}

const confirmAddNew = (next, section) => {
	logDivider()
	inquirer.prompt([{
		type: "confirm",
		name: "addNew",
		message: questions.addNew,
	}])
		.then(({ addNew }) => {
				if ( addNew ) {
					next(section)
				} else {
					endSection(section)
				}
		});
}

const addNewListItem = (section) => {
	inquirer.prompt([{
			type: "input",
			name: "itemContent",
			message: questions.itemContent,
		}])
			.then(({ itemContent }) => {
					section.content.push(itemContent)

					confirmAddNew(addNewListItem, section)
			});
}

const addNewExperienceListItem = (section) => {
	inquirer.prompt([{
					type: "input",
					name: "itemTitle",
					message: questions.itemTitle,
			},
			{
					type: "input",
					name: "itemSubtitle",
					message: questions.itemSubtitle,
			},
			{
					type: "input",
					name: "itemContent",
					message: questions.itemContent,
			}])
			.then(({ itemTitle, itemSubtitle, itemContent }) => {
					section.content.push({
							title: itemTitle,
							date: itemSubtitle,
							content: itemContent
					})

					console.log("section", section)

					confirmAddNew(addNewExperienceListItem, section)
			});
}

const addNewContentItem = (section) => {
	inquirer.prompt([
			{
					type: "input",
					name: "sectionContent",
					message: questions.sectionContent,
			}])
			.then(({ sectionContent }) => {
					section.content = sectionContent

					console.log("section", section)

					endSection(section)
									
			});
}

const showFilledInfos = () => {
	logConfirmation('You already added a section.')

	data[0].map(section => {
		console.log(secondaryColor(chalk.bold("Section title: ")), section.title)
		console.log(secondaryColor(chalk.bold("Section content: ")), section.content)
	})

	console.log("\n")
}

const promptConfirmInfos = (nextSectionContent, section) => {
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
						name: "editSection",
						message: questions.infoToEdit,
						choices: choices.editSection,
					}
				])
				.then(({ editSection }) => {
					isFirstEdition = false
					
					if (editSection.includes("Title")) {
						inquirer.prompt([
							{
									type: "input",
									name: "sectionTitle",
									message: questions.sectionTitle,
							}
						])
						.then(({ sectionTitle}) => {
							data[0][0].title = sectionTitle
							promptConfirmInfos()
						});
					} else if (editSection.includes("Content")) {
						inquirer.prompt([
							{
									type: "input",
									name: "sectionContent",
									message: questions.sectionContent,
							}])
							.then(({ sectionContent }) => {
									data[0][0].content = sectionContent
									promptConfirmInfos()					
							});
					} else {
						setTimeout(() => confirmAddNew(nextSectionContent, section), 800)
					}

				});
			} else {
				setTimeout(() => confirmAddNew(nextSectionContent, section), 800)
			}
		});
}

exports.getSectionContent = () => {
	logTitle(
		"Section", 
		"Now, it's time to fill the main infos in your CV! \nYou'll be able to set the section title and it's content. Your content can be an unordered list, a list with title, subtitle and content or just a section with title and content.\n Use the sections to fill your previous experiences, your goals, skills, etc."
	)

	const section = {
		content: []
	}

	const nextSectionContent = ({ sectionType }) => {
		if (sectionType.includes("1")) {
			addNewListItem(section)
		}
		
		if (sectionType.includes("2")) {
			addNewExperienceListItem(section)
		}
		
		if (sectionType.includes("3")) {
			addNewContentItem(section)
		}
	}

	if (hasDataInfo) {
		showFilledInfos()
		promptConfirmInfos(nextSectionContent, section)
	} else {
		promptList(nextSectionContent, section)
	}
}