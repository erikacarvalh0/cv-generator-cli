import versionsControl from "./versions-control.json" assert { type: 'json' }

console.log('Object.values(versionsControl)', Object.values(versionsControl))
const [bodyEl] = document.getElementsByTagName('body')

const generateLinks = () => {
	const ulEl = document.createElement('ul')
	
	Object.values(versionsControl).map(version => {

		version.map(versionLanguage => {
			const liEl = document.createElement('li')
			const linkEl = document.createElement('a')
			const filePath = `./cv/?id=${versionLanguage.id}&lang=${versionLanguage.language}`
			linkEl.setAttribute('href', filePath)
			linkEl.innerText = `${versionLanguage.id} - ${versionLanguage.language}`
	
			liEl.appendChild(linkEl)
			ulEl.appendChild(liEl)
		})
	})

	bodyEl.appendChild(ulEl)
}

generateLinks()