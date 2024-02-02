const express = require('express')
const logger = require('../logger')
const router = express.Router()

router.get('/health', async (req, res) => {
    try {
        logger.info('Server is up and running')
        res.status(200).json({
            status: 'ok',
            message: 'Server is up and running',
        })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
})

module.exports = router
