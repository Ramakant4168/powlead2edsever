import {
	getAnchorsWithPageInfo
} from './crawler.controller'


const routes = {
	path: '/crawler',
	subRoutes: [{
		path: '/get-page-info',
		method: 'post',
		handler: getAnchorsWithPageInfo
	}]
}


export default {
	routes
}
