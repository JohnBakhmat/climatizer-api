require('dotenv').config()
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve)
app.use('/api-docs', swaggerUi.setup(swaggerDocument))

require('./Services/AuthService')(app)

require('./Services/AccessService')(app)
require('./Services/BuildingService')(app)
require('./Services/ClimateSettingService')(app)
require('./Services/DeviceService')(app)
require('./Services/PresetService')(app)
require('./Services/RoomService')(app)
require('./Services/SensorService')(app)
require('./Services/SensorDataService')(app)

// Logic goes here

module.exports = app
