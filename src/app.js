require('dotenv').config()
const express = require('express')
const cors = require('cors')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve)
app.use('/api-docs', swaggerUi.setup(swaggerDocument))
app.use(
  cors({
    origin: '*'
  })
)

// require('./Data/BackupCRON')
require('./Services/AuthService')(app)
require('./Services/CRUD/AccessService')(app)
require('./Services/CRUD/BuildingService')(app)
require('./Services/CRUD/ClimateSettingService')(app)
require('./Services/CRUD/DeviceService')(app)
require('./Services/CRUD/PresetService')(app)
require('./Services/CRUD/RoomService')(app)
require('./Services/CRUD/SensorService')(app)
require('./Services/CRUD/SensorDataService')(app)
require('./Data/BackupService')(app)

//BusinessLayer
require('./BusinessLayer/RequestService')(app)
require('./BusinessLayer/MobileService')(app)
require('./BusinessLayer/DeviceService')(app)

require('./Services/StatisticsService')(app)
module.exports = app
