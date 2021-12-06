const { verifyJwtToken } = require('../Middleware/JwtService')
const Rooms = require('../Models/Room')
const Users = require('../Models/User')
const Access = require('../Models/Access')
const Presets = require('../Models/Preset')
const Request = require('../Models/Request')
const { Types } = require('mongoose')

//
socket = null
module.exports = (app) => {
  app.get('/request', verifyJwtToken, (req, res) => {
    Request.find({}, (err, request) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(request)
    })
  })
  app.post('/request/create', verifyJwtToken, (req, res) => {
    const { presetId, userId, roomId } = req.body

    const roomPromise = new Promise((resolve, reject) => {
      resolve(Rooms.findById(roomId))
    })
    const userPromise = new Promise((resolve, reject) => {
      resolve(Users.findById(userId))
    })
    const presetPromise = new Promise((resolve, reject) => {
      resolve(Presets.findById(presetId))
    })
    Promise.all([roomPromise, userPromise]).then(([room, user]) => {
      Access.findOne({ roomId: roomId, userid: userId }, (err, access) => {
        if ((!access || !access.isAllowed) && user.role !== 'admin') {
          return res.status(500).send('You have no access to this room!')
        } else {
          Promise.all([presetPromise]).then((preset) => {
            const body = {
              devices: room?.devices,
              user: userId,
              fetchTime: Date.now(),
              status: 'In Progress'
            }
            const newRequest = new Request({
              _id: Types.ObjectId(),
              ...body
            })
            newRequest.save((error) => {
              error && console.error(error)
            })
            socket && socket.emit('set-device-settings', body)
            return res.status(200).send({ requestId: newRequest._id })
          })
        }
      })
    })
  })

  app.delete('/request/cancel', verifyJwtToken, (req, res) => {
    const { requestId } = req.body

    Request.findById(requestId, (error, request) => {
      if (request && request.status !== 'Completed') {
        Request.findByIdAndDelete(requestId, (error, result) => {
          res.status(400).send('This request successfuly deleted')
        })
      } else if (request && request.status === 'Completed') {
        res
          .status(500)
          .send('This request is already completed. You cannot cancel it')
      } else {
        res.status(404).send('Could not find the request!')
      }
    })
  })

  socket &&
    socket.on('device-preset-complete', ({ preset, request }) => {
      Request.findOneAndUpdate(
        { _id: request },
        { status: 'Completed' },
        (err, result) => {
          socket && socket.emit('client-preset-complete', preset)
        }
      )
    })
}
