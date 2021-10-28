require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const User = require('./Models/User')
const app = express()
app.use(express.json())

require('./Controllers/AuthController')(app)
require('./Controllers/DeviceController')(app)

// Logic goes here

module.exports = app
