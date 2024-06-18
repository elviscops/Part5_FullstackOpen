const config = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./App') // varsinainen Express-sovellus

console.log(config.PORT)
app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})