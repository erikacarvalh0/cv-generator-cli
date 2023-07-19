const chalk = require('chalk')

const { choices } = require('./choices')
const { questions } = require('./questions')
const { optionsInfos } = require('./options')

exports.choices = choices
exports.questions = questions
exports.optionsInfos = optionsInfos

exports.metadata = {}

exports.header = {
	personalInfos: []
}
exports.data = [[]];

const trueValue = "y"
const falseValue = "n"

exports.trueValue = trueValue
exports.falseValue = falseValue
exports.yesNoOptions = [trueValue, falseValue]

const textType = "text"
const linkType = "link"

exports.textType = textType
exports.linkType = linkType
exports.contentTypes = [textType, linkType]

exports.mainColor = chalk.hex("#1EBFC3")
exports.secondaryColor = chalk.hex("#FF5681")