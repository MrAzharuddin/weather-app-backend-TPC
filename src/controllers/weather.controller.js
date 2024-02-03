const logger = require('../logger')
const axios = require('axios')
const { CONSTANTS } = require('../configs')
const Base_URL = 'https://api.openweathermap.org/data/2.5/'

const weatherInfo = async (req, res) => {
    const { lat, lon } = req.body
    if (!(lat && lon)) {
        logger.error('lat and lon are required')
        return res
            .status(400)
            .json({ status: 'error', message: 'lat and lon are required' })
    }
    try {
        let weatherInfo = await axios.get(
            `${Base_URL}/weather?lat=${lat}&lon=${lon}&appid=${CONSTANTS.OPENWEATHERMAP_API_KEY}`
        )

        logger.info('Weather info fetched successfully')
        res.status(200).json({
            status: 'ok',
            message: 'Weather info fetched successfully',
            data: weatherInfo.data,
        })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

module.exports = {
    weatherInfo,
}
