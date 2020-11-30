
import {
	createPromiseHandler
} from '../../utils'

import {
	fetchAnchorsWithPageInfo as fetchAnchorsWithPageInfoService

} from './crawler.service'


const getAnchorsWithPageInfo = createPromiseHandler(({
	body
}) => {
	if (!body) {
		return Promise.reject(new Error('Input not valid'))
	}
	return fetchAnchorsWithPageInfoService(body)
})


export {
	getAnchorsWithPageInfo
}
