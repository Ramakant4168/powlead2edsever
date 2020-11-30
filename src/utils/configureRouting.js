import {
	Router
} from 'express'
import {
	compact
} from 'lodash'
import notFoundhandler from './404Handler'


export default function createRouting(routes) {
	if (!Array.isArray(routes)) {
		routes = [routes]
	}
	const router = Router()
	compact(routes).forEach(({
		path,
		method = 'get',
		handler = notFoundhandler(),
		subRoutes
	}) => {
		if (path) {
			router[method](path, handler)
			if (subRoutes) {
				router.use(path, createRouting(subRoutes))
			}
		}
	})
	return router
}
