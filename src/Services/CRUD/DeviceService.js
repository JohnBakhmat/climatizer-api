const mongoose = require('mongoose')
const Device = require('../../Models/Device')
const { verifyJwtToken } = require('../../Middleware/JwtService')
module.exports = (app) => {
  //Get all devices
  app.get('/device', verifyJwtToken, (req, res) => {
    Device.find({}, (err, devices) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(devices)
    })
  })

  app.post('/device', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const serialNumber = req.body.serialNumber
    try {
      const newDevice = new Device({
        _id: mongoose.Types.ObjectId(),
        serialNumber: serialNumber
      })

      newDevice.save((err) => {
        if (err) return console.error(err)
        res.send(newDevice)
      })
    } catch (err) {
      console.log(err)
    }
  })

  app.put('/device/:id', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const id = req.params.id
    const serialNumber = req.body.serialNumber

    try {
      const newDevice = new Device({
        _id: id,
        serialNumber: serialNumber
      })

      Device.findOneAndUpdate(
        { _id: id },
        newDevice,
        { new: true },
        (err, device) => {
          if (err) return console.log(err)
          res.send(newDevice)
        }
      )
    } catch (err) {
      console.error(err)
    }
  })

  app.get('/device/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    Device.findById(id, (err, device) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(device)
    })
  })

  app.delete('/device/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    Device.findByIdAndDelete(id, (err, device) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(device)
    })
  })
}
