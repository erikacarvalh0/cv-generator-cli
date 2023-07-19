
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const { id, lang } = params
const [bodyEl] = document.getElementsByTagName('body')

const fullData = import(`../../src/versions/${id}/data-${lang}.json`, { assert: { type: "json" }}).then((jsonData) => {
	const { header, data, metadata } = jsonData.default
	const { theme } = metadata

	const createHeader = () => {
		const { image, alt, divider, personalInfos } = header
		const headerEl = document.createElement('header');
		headerEl.classList.add('header');

		if (image) {
			const logoEl = document.createElement('img');
			logoEl.classList.add('header__logo');
			logoEl.setAttribute('alt', alt)
			logoEl.setAttribute('src', image)

			headerEl.appendChild(logoEl)
		}
		
		if (image && divider && personalInfos) {
			const dividerEl = document.createElement('hr')
			dividerEl.classList.add('header__divider')

		headerEl.appendChild(dividerEl)
		}

		if (personalInfos) {
			const divHeaderEl = document.createElement('div')
			divHeaderEl.classList.add('header__info')

			personalInfos.map(info => {
				if (info.type === "text") {
					const textEl = document.createElement('p')
					textEl.classList.add('header__info-text')
					textEl.innerText = info.content

					divHeaderEl.appendChild(textEl)
				}

				if (info.type === "link") {
					const linkContainerEl = document.createElement('p')
					linkContainerEl.classList.add('header__info-text')
				
					const linkEl = document.createElement('a')
					linkEl.classList.add('header__info-link')
					linkEl.setAttribute('href', info.href)
					linkEl.innerText = info.content

					linkContainerEl.appendChild(linkEl)
					divHeaderEl.appendChild(linkContainerEl)
				}
			})
			
			headerEl.appendChild(divHeaderEl)
		}


		return headerEl
	}

	const createList = (item) => {
			const listItemEl = document.createElement('li')
			listItemEl.classList.add('content__list-item')

			const bulletEl = document.createElement('p')
			bulletEl.classList.add('bullet')
			bulletEl.innerText = '.'

			const contentTextEl = document.createElement('p')
			contentTextEl.classList.add('text')
			contentTextEl.innerText = item

			listItemEl.appendChild(bulletEl)
			listItemEl.appendChild(contentTextEl)

		return listItemEl
	}

	const createExperienceList = (item) => {
			const listItemEl = document.createElement('li')
			listItemEl.classList.add('content__list-experience')

			if (item.title) {
				const contentTitleEl = document.createElement('h3')
				contentTitleEl.classList.add('title')
				contentTitleEl.innerText = item.title

				listItemEl.appendChild(contentTitleEl)
			}


			if (item.date) {
				const contentDateEl = document.createElement('p')
				contentDateEl.classList.add('date')
				contentDateEl.innerText = item.date

				listItemEl.appendChild(contentDateEl)
			}

			if (item.content) {
				const contentTextEl = document.createElement('p')
				contentTextEl.classList.add('text')
				contentTextEl.innerHTML = item.content
		
				listItemEl.appendChild(contentTextEl)
			}
			
		return listItemEl
	}

	const createContent = (content) => {
		let contentEl = null

		switch(typeof content) {
				case "string": {
					const textEl = document.createElement('p')
					textEl.classList.add('content__text')

					textEl.innerText = content

					contentEl = textEl
					break
				}
				case "object": {
					const listEl = document.createElement('ul')
					listEl.classList.add('content__list')

					content.map(item => {
						const listItemEl = item.title 
							? createExperienceList(item) 
							: createList(item)
						
						listEl.appendChild(listItemEl)
					})

					contentEl = listEl
					break
				}

				default: {
					console.log(content)
				}
			}

			return contentEl
	}

	const appendPage = (page, articleEl) => {
		page.map(({ title, content }) => {
			const sectionEl = document.createElement('section')
			sectionEl.classList.add('content')

			if (title) {
				const titleEl = document.createElement('h2')
				titleEl.classList.add('content__title')
				titleEl.innerText = title

				sectionEl.append(titleEl)
			}
			
			const contentEl = createContent(content)

			sectionEl.appendChild(contentEl)

			articleEl.appendChild(sectionEl)
		})
	}

	if (theme) { 
		const [headEl] = document.getElementsByTagName('head')
		const headContent = headEl.innerHTML
		
		const styleTag = `<link type="text/css" rel="stylesheet" href="../../themes/${theme}.css">`

		headEl.innerHTML = headContent + styleTag

		bodyEl.classList.add(theme)
	}

	data.map(page => {
		const headerEl = createHeader()

		const articleEl = document.createElement('article')
		articleEl.classList.add('paper-container')

		articleEl.appendChild(headerEl);
		appendPage(page, articleEl);

		bodyEl.appendChild(articleEl);
	})
})
