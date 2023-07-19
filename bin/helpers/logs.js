
const chalk = require('chalk')
const boxen = require('boxen')

const { mainColor, secondaryColor } = require('../vars')

exports.logTitle = (title, description) => {
	console.log('\n')
	console.log(chalk.bold(mainColor(boxen(title.toUpperCase(), { padding: 1 }))))
	console.log(mainColor(description))
	console.log('\n')
}

exports.logConfirmation = (text) => console.log(chalk.bold(text))
exports.logDivider = () => console.log(chalk.bold(secondaryColor("\n____________________________________________________________________\n")))