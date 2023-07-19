exports.optionsInfos = {
	i: {
		alias:"imageUrl", 
		describe: "Image url to be used at the header", 
		type: "string", 
	},
	a: {
		alias:"imageAlt", describe: "Alt text for the image at the header", type: "string"
	},
	d: {
		alias:"divider", describe: "Divider between image and personal infos", type: "boolean"
	},
	l: {
		alias:"location", describe: "Add your location to the header", type: "string"
	},
	e: {
		alias:"email", describe: "Add a email to the header", type: "string"
	},
	p: {
		alias:"profile", describe: "Add a profile link to the header (your website, github or any profile you want)", type: "string"
	},
	m: {
		alias:"me", describe: "Add the content for a section with title About me", type: "string", 
	},
	g: {
		alias:"language", describe: "Define this CV language", type: "string", 
	},
	t: {
		alias:"theme", describe: "Define this CV theme", type: "string", 
	},
	f: {
		alias:"identifier", describe: "Define this CV identifier", type: "string", 
	},
}