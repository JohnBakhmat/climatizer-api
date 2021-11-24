const { Types } = require('mongoose')
const Access = require('../../Models/Access')
const Room = require('../../Models/Room')
const { verifyJwtToken } = require('../../Middleware/JwtService')

module.exports = (app) => {
  app.get('/access', verifyJwtToken, (req, res) => {
    Access.find({}, (err, rooms) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(rooms)
    })
  })
  app.get('/access/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    Access.findById(id, (err, room) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(room)
    })
  })
  app.post('/access', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const body = req.body
    try {
      const newAccess = new Access({
        _id: Types.ObjectId(),
        room: body.roomId,
        user: body.userId,
        isAllowed: true
      })
      newAccess.save((error) => {
        error && console.error(error)
      })
    } catch (e) {
      console.error(e)
      res.sendStatus(400)
    }
  })
  app.put('/access/:id', verifyJwtToken, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const id = req.params.id
    const body = req.body

    try {
      const newAccess = new Access({
        _id: id,
        room: new Types.ObjectId(body.room),
        user: new Types.ObjectId(body.user),
        isAllowed: body.isAllowed
      })

      Access.findOneAndUpdate(
        { _id: id },
        newAccess,
        { new: true },
        (err, access) => {
          if (err) return console.log(err)
          res.send(access)
        }
      )
    } catch (err) {
      console.error(err)
    }
  })

  app.delete('/access/:id', verifyJwtToken, (req, res) => {
    const id = req.params.id
    Access.findByIdAndDelete(id, (err, room) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(room)
    })
  })
}
