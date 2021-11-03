require('dotenv').config()
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve)
app.use('/api-docs', swaggerUi.setup(swaggerDocument))

require('./Controllers/AuthController')(app)

require('./Controllers/AccessController')(app)
require('./Controllers/BuildingController')(app)
require('./Controllers/ClimateSettingController')(app)
require('./Controllers/DeviceController')(app)
require('./Controllers/PresetController')(app)
require('./Controllers/RoomController')(app)
require('./Controllers/SensorController')(app)
require('./Controllers/SensorDataController')(app)

// Logic goes here

module.exports = app
