const { verifyJwtToken } = require('../../Middleware/JwtService')
const Access = require('../../Models/Access')
const Building = require('../../Models/Building')
const ClimateSetting = require('../../Models/ClimateSetting')
const Device = require('../../Models/Device')
const Preset = require('../../Models/Preset')
const Room = require('../../Models/Room')
const Sensor = require('../../Models/Sensor')
const SensorData = require('../../Models/SensorData')
module.exports = (app) => {
  app.post('/search/room', verifyJwtToken, (request, response) => {
    Room.findOne({ title: request.body.title })
  })
}
