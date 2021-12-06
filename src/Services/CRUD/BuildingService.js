const { Types } = require('mongoose')
const Building = require('../../Models/Building')
const { verifyJwtToken } = require('../../Middleware/JwtService')

module.exports = (app) => {
  app.get('/building', verifyJwtToken, (req, res) => {
    Building.find({}, (err, buildings) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(buildings)
    })
  })
  app.get('/building/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    Building.findById(id, (err, building) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(building)
    })
  })
  app.post('/building', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const body = req.body
    try {
      const newBuilding = new Building({
        _id: Types.ObjectId(),
        address: body.address
      })
      newBuilding.save((error) => {
        console.error(error)
      })
    } catch (e) {
      console.error(e)
      res.sendStatus(400)
    }
  })
  app.put('/building/:id', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const id = req.params.id
    const body = req.body

    try {
      const newBuilding = new Building({
        _id: id,
        address: body.address
      })

      Building.findOneAndUpdate(
        { _id: id },
        newBuilding,
        { new: true },
        (err, building) => {
          if (err) return console.log(err)
          res.send(building)
        }
      )
    } catch (err) {
      console.error(err)
    }
  })

  app.delete('/building/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    Building.findByIdAndDelete(id, (err, building) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(building)
    })
  })
}
