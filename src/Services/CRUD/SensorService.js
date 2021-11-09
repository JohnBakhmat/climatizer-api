const { Types } = require('mongoose')
const Sensor = require('../Models/Sensor')
const { verifyJwtToken } = require('../Middleware/JwtService')

module.exports = (app) => {
  app.get('/sensor', verifyJwtToken, (req, res) => {
    Sensor.find({}, (err, sensors) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(sensors)
    })
  })

  app.get('/sensor/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    Sensor.findById(id, (err, sensor) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(sensor)
    })
  })
  app.post('/sensor', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const body = req.body
    try {
      const newSensor = new Sensor({
        _id: Types.ObjectId(),
        model: body.model,
        status: 'Idle'
      })

      newSensor.save((err) => {
        if (err) return console.error(err)
        res.send(newSensor)
      })
    } catch (error) {
      console.error(error)
    }
  })
  app.put('/sensor/:id', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const id = req.params.id
    const body = req.body

    try {
      const newSensor = new Sensor({
        _id: id,
        model: body?.model,
        status: body?.status
      })

      Sensor.findOneAndUpdate(
        { _id: id },
        newSensor,
        { new: true },
        (err, sensor) => {
          if (err) return console.log(err)
          res.send(sensor)
        }
      )
    } catch (err) {
      console.error(err)
    }
  })
  app.delete('/sensor/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    Sensor.findOneAndDelete({ _id: id }, (err, sensor) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(sensor)
    })
  })
}
