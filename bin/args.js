
const yargs = require("yargs")
const figlet = require('figlet')
const chalk = require('chalk')

const { header, data, metadata, mainColor, secondaryColor, optionsInfos } = require('./vars')

const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

const usage = chalk.bold("\nLet's start your CV! :)")
	+ "\n\nUsage: "
	+ chalk.hex("#1EBFC3").dim("cv-cli -i <image-url> -a <image-alt> -d -e <your-email> -l <your location> -p <your-profile-link> -m <about-me-content> -f <cv-id> -g <cv-language> -t <cv-theme> \n")
;

const options = yargs
    .usage(usage)
    .option("i", {
			alias: optionsInfos.i.alias, 
			describe: optionsInfos.i.describe, 
			type: optionsInfos.i.type, 
			demandOption: false 
		})
    .option("a", {
			alias: optionsInfos.a.alias, 
			describe: optionsInfos.a.describe, 
			type: optionsInfos.a.type, 
			demandOption: false 
		})
		.option("d", {
			alias: optionsInfos.d.alias, 
			describe: optionsInfos.d.describe, 
			type: optionsInfos.d.type, 
			demandOption: false 
		})
		.option("l", {
			alias: optionsInfos.l.alias, 
			describe: optionsInfos.l.describe, 
			type: optionsInfos.l.type, 
			demandOption: false 
		})
		.option("e", {
			alias: optionsInfos.e.alias, 
			describe: optionsInfos.e.describe, 
			type: optionsInfos.e.type, 
			demandOption: false 
		})
		.option("p", {
			alias: optionsInfos.p.alias, 
			describe: optionsInfos.p.describe, 
			type: optionsInfos.p.type, 
			demandOption: false 
		})
		.option("m", {
			alias: optionsInfos.m.alias, 
			describe: optionsInfos.m.describe, 
			type: optionsInfos.m.type, 
			demandOption: false 
		})
		.option("g", {
			alias: optionsInfos.g.alias, 
			describe: optionsInfos.g.describe, 
			type: optionsInfos.g.type, 
			demandOption: false 
		})
		.option("f", {
			alias: optionsInfos.f.alias, 
			describe: optionsInfos.f.describe, 
			type: optionsInfos.f.type, 
			demandOption: false 
		})
		.option("t", {
			alias: optionsInfos.t.alias, 
			describe: optionsInfos.t.describe, 
			type: optionsInfos.t.type, 
			demandOption: false 
		})
    .argv;

metadata.id =  argv.f  || argv.identifier;
metadata.theme =  argv.t  || argv.theme;
metadata.language =  argv.g  || argv.language;

header.image =  argv.i  || argv.imageUrl;
header.alt =  argv.a  || argv.imageAlt;
header.divider =  argv.d  || argv.divider || false;

const location = argv.l  || argv.location
    ? {
        type: 'text',
        content: argv.l  || argv.location,
    }
    : undefined

const email = argv.e  || argv.email 
    ? {
        type: 'link',
        content: argv.e  || argv.email,
        href: `mailto:${argv.e  || argv.email}`
    }
    : undefined

const profile = argv.p  || argv.profile
    ? {
        type: 'link',
        content: argv.p  || argv.profile,
        href: argv.p  || argv.profile
    }
    : undefined

const section = argv.m  || argv.me
    ? {
        title: "About me",
        content: argv.m  || argv.me
    } 
    : undefined

if (location) {
	header.personalInfos.push(location)
}

if (email) {
	header.personalInfos.push(email)
}

if (profile) {
	header.personalInfos.push(profile)
}

if (section) {
	data[0].push(section)
}


exports.startCLI = () => {
	console.log(
		"\n\n\n" +
		mainColor(
			figlet.textSync('CV CLI', { horizontalLayout: 'full', font: 'roman' })
		)
	);
	console.log(usage)
	// yargs.showHelp();
}