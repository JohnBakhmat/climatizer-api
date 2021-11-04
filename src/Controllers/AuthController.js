const jwt = require('jsonwebtoken')
const Users = require('../Models/User')
const { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY } = process.env
const mongoose = require('mongoose')

module.exports = (app) => {
  // Register
  app.post('/auth/login', (req, res) => {
    // our register logic goes here...
    const body = req.body
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
          jwt.sign(body, JWT_PRIVATE_KEY, config, (error, token) => {
            if (error) res.status(500).send(error)
            res.status(200).send({ idToken: token })
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
          jwt.sign(body, JWT_PRIVATE_KEY, config, (error, token) => {
            if (error) res.status(500).send(error)
            res.send({ idToken: token })
          })
        }
      }
    )
  })
}
