
export default ({
	text = '404. Not found',
	status = 404
} = {}) => (_req, res) => {
	res.status(status).send(text)
}
