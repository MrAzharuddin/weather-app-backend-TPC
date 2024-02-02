const mongoose = require('mongoose')
const logger = require('../logger')
const CONSTANTS = require('./constants')
let db
const mongoUri = CONSTANTS.MONGO_URI
const connectDB = async () => {
    let retries = 5
    let isConnected = false

    while (!isConnected && retries > 0) {
        try {
            mongoose.Promise = global.Promise
            mongoose.set('strictQuery', true)
            await mongoose.connect(mongoUri, {
                dbName: 'klimb',
            })
            isConnected = true
            logger.info(`Database connected: ${mongoose.connection.host}`)
        } catch (error) {
            retries--
            logger.error(`Error connecting to database: ${error.message}`)
            logger.error(`Retries left: ${retries}`)
            await new Promise((resolve) => setTimeout(resolve, 5000)) // wait 5 seconds before retrying
        }
    }

    if (!isConnected) {
        logger.error(
            'Unable to establish database connection after multiple attempts. Exiting...'
        )
        process.exit(1) // exit the process with an error code of 1 (indicating a failure)
    }

    //   grateful shutdown
    process.on('SIGINT', async () => {
        try {
            await mongoose.disconnect()
            logger.info('Database connection closed successfully')
            process.exit(0) // exit the process with an error code of 0 (indicating a success)
        } catch (error) {
            logger.error('Error closing database connection: ' + error.message)
            process.exit(1) // exit the process with an error code of 1 (indicating a failure)
        }
    })
}

const getCollection = (name) => {
    if (!db) {
        db = mongoose.connection.db
    }
    return db.collection(name)
}

module.exports = { connectDB, getCollection }
