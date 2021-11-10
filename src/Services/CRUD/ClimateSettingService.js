const { Types } = require('mongoose')
const ClimateSetting = require('../../Models/ClimateSetting')
const { verifyJwtToken } = require('../../Middleware/JwtService')

module.exports = (app) => {
  app.get('/climateSetting', verifyJwtToken, (req, res) => {
    ClimateSetting.find({}, (err, rooms) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(rooms)
    })
  })
  app.get('/climateSetting/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    ClimateSetting.findById(id, (err, room) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(room)
    })
  })
  app.post('/climateSetting', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const body = req.body
    try {
      const newClimateSetting = new ClimateSetting({
        _id: Types.ObjectId(),
        expression: body.expression,
        value: body.value,
        units: body.units
      })
      newClimateSetting.save((error) => {
        throw error
      })
    } catch (e) {
      console.error(e)
      res.sendStatus(400)
    }
  })
  app.put('/climateSetting/:id', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const id = req.params.id
    const body = req.body

    try {
      const newClimateSetting = new Room({
        _id: id,
        expression: body.expression,
        value: body.value,
        units: body.units
      })

      ClimateSetting.findOneAndUpdate(
        { _id: id },
        newClimateSetting,
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

  app.delete('/climateSetting/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    ClimateSetting.findByIdAndDelete(id, (err, room) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(room)
    })
  })
}
