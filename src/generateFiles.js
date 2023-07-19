const fs = require("fs")
const { exec } = require("child_process");

const generateVersionControl = (metadata) => {
	const versionsControlPath = `./cv-generator/versions-control.json`
	const rawVersionsControl = fs.readFileSync(versionsControlPath)
	const versionsControl = JSON.parse(rawVersionsControl)

	const notCurrentLanguage =  versionsControl?.[metadata.id]
	? versionsControl[metadata.id].filter(version => version.language !== metadata.language)
	: []
	
	const currentMetadata = versionsControl?.[metadata.id]
		? [...notCurrentLanguage, metadata]
		: [metadata]
		
	fs.writeFileSync(versionsControlPath, JSON.stringify({...versionsControl, [metadata.id]: currentMetadata}))

}

const generateData = (metadata, dataString) => {
	if (!fs.existsSync(`src/versions/${metadata.id}`)){
    fs.mkdirSync(`src/versions/${metadata.id}`)
	}
		
	fs.writeFileSync(`./src/versions/${metadata.id}/data-${metadata.language}.json`, dataString)
}

const generateFiles = () => {
	const [, rawData] = process.env.npm_lifecycle_script.split('DATA=')

	const dataString = rawData.replaceAll("U+0022", "\"")
		// .replaceAll("\\u003b", ";")
		.replaceAll("U+003A", ":")
		.replace(/\"$/, "")
	
	const { metadata } = JSON.parse(dataString)

	generateData(metadata, dataString)
	generateVersionControl(metadata)
	
}

exports.generateFiles = generateFiles