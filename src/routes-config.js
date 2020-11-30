import {compact} from 'lodash'
import {notFoundhandler, createRouting} from './utils'
import modules from './modules'

export default app => {
	compact(Object.values(modules)).forEach(({
		routes = []
	}) => {
		app.use('/powlead2ed', createRouting(routes))
	})
	app.all('/*', notFoundhandler())
}
