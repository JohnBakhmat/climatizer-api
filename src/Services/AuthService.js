const Users = require('../Models/User')
const mongoose = require('mongoose')
const device = require('device')
const fs = require('fs')
const {
  signJwtToken,
  verifyJwtToken,
  validateBodyToken
} = require('../Middleware/JwtService')
const StatEvent = require('../Models/StatEvent')

module.exports = (app) => {
  // Register
  app.post('/auth/login', (req, res) => {
    // our register logic goes here...
    const body = req.body
    const deviceType = device(req.headers['user-agent']).type
    console.log(body)
    console.log(deviceType)
    const config = {
      algorithm: 'HS256'
    }
    Users.findOne(
      { email: body.email, password: body.password },
      (err, user) => {
        if (!user) {
          res.status(404).send("User wasn't found!")
        } else if (err) {
          res.status(500).send(err)
        } else {
          signJwtToken(body, config, res)

          new StatEvent({
            _id: mongoose.Types.ObjectId(),
            type: 'Login',
            dateTime: Date.now(),
            deviceType: deviceType
          }).save((error) => {
            if (error) {
              res.status(500).send(error)
            }
          })
        }
      }
    )
  })

  // Login
  app.post('/auth/register', (req, res) => {
    // our login logic goes here
    const body = req.body
    const config = {
      algorithm: 'HS256'
    }
    Users.findOne(
      { email: body.email, password: body.password },
      (err, user) => {
        if (user) {
          res.status(200).send('User already exists')
        } else if (err) {
          res.status(500).send(err)
        } else {
          const newUser = new Users({
            _id: mongoose.Types.ObjectId(),
            email: body.email,
            password: body.password
          })
          newUser.save((error) => {
            if (error) {
              res.status(500).send(error)
            }
          })
          signJwtToken(body, config, res)
        }
      }
    )
  })
  app.post('/auth/renew', (req, res) => {
    const idToken = req.body.idToken
    validateBodyToken(idToken, (status, data) => {
      if (status === 'SUCCESS') {
        Users.findOne(
          { email: data.email, password: data.password },
          (err, user) => {
            if (!user) {
              res.status(404).send("User wasn't found!")
            } else if (err) {
              res.status(500).send(err)
            } else {
              const data = {
                _id: user.id,
                email: user.email,
                role: user.role,
                access: user.access,
                presets: user.presets
              }
              res.status(200).send(data)
            }
          }
        )

        // res.status(200).send(data)
      } else if (status === 'ERROR') {
        res.status(402).send(data)
      }
    })
  })
}

// module.exports = verifyJwtToken
