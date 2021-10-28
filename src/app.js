require('dotenv').config()
const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve);
app.use('/api-docs',swaggerUi.setup(swaggerDocument))

require('./Controllers/AuthController')(app)
require('./Controllers/DeviceController')(app)
require('./Controllers/SensorController')(app)

// Logic goes here

module.exports = app
