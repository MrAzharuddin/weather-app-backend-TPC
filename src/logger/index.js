const winston = require('winston')
const { combine, timestamp, printf, colorize } = winston.format

//get the date and time string in local format
const date = new Date()

const newdate =
    date.toLocaleString('en-IN', {
        timeZone: 'IST',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }) +
    ' ' +
    date.toLocaleString('en-IN', {
        timeZone: 'IST',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    })

winston.addColors({
    info: 'bold blue',
    error: 'bold red',
    warn: 'bold italic yellow',
    debug: 'gray',
    trace: 'cyan',
    fatal: 'magenta',
    success: 'green',
    unknown: 'grey',
    default: 'white',
    data: 'grey',
})

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: newdate }),
        printf(
            (info) =>
                `[${info.level.toUpperCase()}] - ${info.timestamp} | :: | ${info.message}`
        ),
        colorize({
            all: true,
        })
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console(),
    ],
})

module.exports = logger
