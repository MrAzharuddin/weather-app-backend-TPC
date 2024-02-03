require('dotenv').config()

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY

module.exports = { PORT, MONGO_URI, OPENWEATHERMAP_API_KEY, }
