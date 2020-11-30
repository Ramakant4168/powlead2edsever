/* eslint-disable prefer-named-capture-group */

const filterValidUrl = (links, pUrl) => {
	const parentUrl = new URL(pUrl)

	const filteredUrl = links.filter(linkObj => {
		const url = linkObj.link

		// eslint-disable-next-line require-unicode-regexp
		// eslint-disable-next-line no-useless-escape
		const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
		if (regex.test(url)) {
			const childUrl = new URL(url)
			if (parentUrl.origin === childUrl.origin) {
				linkObj.isUrlRelative = 'Yes'
			}
			else {
				linkObj.isUrlRelative = 'External'
			}
			return linkObj
		}
	})

	filteredUrl.forEach(element => {
		element.text = element.text.replace(/(\r\n|\n|\r|\t)/gm, '')
		element.text = element.text.replace(/\s\s+/g, ' ')
		element.text = element.text.trim()

		if (!element.text.trim()) {
			element.text = 'No Text'
		}
	})

	return filteredUrl
}


export {
	filterValidUrl
}

