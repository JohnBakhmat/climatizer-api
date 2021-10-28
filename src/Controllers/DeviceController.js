const { Types } = require('mongoose')
const Device = require('../Models/Device')

module.exports = (app) => {
  //Get all devices
  app.get('/device', (req, res) => {
    Device.find({}, (err, devices) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(devices)
    })
  })

  app.post('/device', (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const serialNumber = req.body.serialNumber
    const newDevice = new Device({ _id: Types.ObjectId(), serialNumber })
    newDevice.save((err) => {
      if (err) return console.error(err)
      res.send(newDevice)
    })
  })
}
