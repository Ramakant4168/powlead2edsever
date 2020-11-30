export default promiser => (req, res, next) => {
	const promise = promiser(req, res, next)
	if (promise && typeof promise.then === 'function') {
		promise
		.then(response => {
			if (!res.headersSent) {
				res.status(200).send(response)
			}
		})
		.catch(error => {
			console.error(error)
			if (!res.headersSent) {
				const {
					status = 500,
					message = ''
				} = error
				res.status(status).send({
					status,
					message
				})
			}
		})
	}
	else {
		console.log('return promise from handler')
	}
}
