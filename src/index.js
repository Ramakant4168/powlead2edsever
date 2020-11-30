import 'dotenv/config'
import express from 'express'
import configureRoutes from './routes-config'
import cors from 'cors'

// const {
// 	port = 3000
// } = process.env


const app = express()

app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({
	extended: true
}))

configureRoutes(app)

app.use((err, req, res, next) => {
	res.locals.error = err
	const status = err.status || 500
	res.status(status)
	res.send('Something Went Wrong')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`listening on port ${port}`)
})

