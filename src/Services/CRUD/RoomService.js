const { Types } = require('mongoose')
const Room = require('../../Models/Room')
const { verifyJwtToken } = require('../../Middleware/JwtService')

module.exports = (app) => {
  app.get('/room', verifyJwtToken, (req, res) => {
    Room.find({}, (err, rooms) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(rooms)
    })
  })
  app.get('/room/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    Room.findById(id, (err, room) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(room)
    })
  })
  app.post('/room', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const body = req.body
    try {
      const newRoom = new Room({
        _id: Types.ObjectId(),
        title: body?.title,
        description: body.description
      })
      newRoom.save((error) => {
        throw error
      })
    } catch (e) {
      console.error(e)
      res.sendStatus(400)
    }
  })
  app.put('/room/:id', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const id = req.params.id
    const body = req.body

    try {
      const newRoom = new Room({
        _id: id,
        title: body.title,
        description: body.description
      })

      Room.findOneAndUpdate(
        { _id: id },
        newRoom,
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

  app.delete('/room/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    Room.findByIdAndDelete(id, (err, room) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(room)
    })
  })
}
