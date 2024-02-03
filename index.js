const express = require('express')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const { CONSTANTS, database } = require('./src/configs')
const logger = require('./src/logger')
const Routes = require('./src/routes')
const app = express()

// init middlewares
app.use(compression()) // Compression is a Node.js middleware for compressing HTTP requests.
app.use(helmet()) // Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(cors()) // CORS is a Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(express.json()) // Express.js middleware that can parse JSON requests.
app.use(express.urlencoded({ extended: true })) // Express.js middleware that can parse URL-encoded requests.

// connect to database
database.connectDB()

// init routes
app.use('/api/v1', Routes.healthRoute)
app.use('/api/v1/weather', Routes.weatherRoute)

app.listen(CONSTANTS.PORT, () => {
    logger.info(`Server is running on port ${CONSTANTS.PORT}`)
})
