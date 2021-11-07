const { Types } = require('mongoose')
const SensorData = require('../Models/SensorData')

module.exports = (app) => {
  app.get('/sensorData', verifyJwtToken, (req, res) => {
    SensorData.find({}, (err, rooms) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(rooms)
    })
  })
  app.get('/sensorData/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    SensorData.findById(id, (err, room) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(room)
    })
  })
  app.post('/sensorData', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const body = req.body
    try {
      const newSensorData = new SensorData({
        _id: Types.ObjectId(),
        data: body.data,
        units: body.units,
        fetchTime: new Date()
      })
      newSensorData.save((error) => {
        throw error
      })
    } catch (e) {
      console.error(e)
      res.sendStatus(400)
    }
  })
  app.put('/sensorData/:id', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const id = req.params.id
    const body = req.body

    try {
      const newSensorData = new Room({
        _id: id,
        data: body.data,
        units: body.units,
        fetchTime: body.fetchTime
      })

      SensorData.findOneAndUpdate(
        { _id: id },
        newSensorData,
        { new: true },
        (err, room) => {
          if (err) return console.log(err)
          res.send(room)
        }
      )
    } catch (err) {
      console.error(err)
    }
  })

  app.delete('/sensorData/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    SensorData.findByIdAndDelete(id, (err, room) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(room)
    })
  })
}
