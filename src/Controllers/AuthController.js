const Users = require('../Models/User')
const mongoose = require('mongoose')
const { signJwtToken } = require('../Middleware/JwtService')

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
<<<<<<< HEAD
          signJwtToken(body, config, res)
=======
          jwt.sign(body, JWT_PRIVATE_KEY, config, (error, token) => {
            if (error) res.status(500).send(error)
            res.status(200).send({ idToken: token })
          })
>>>>>>> b31c3145d2c568d5242cea2529dcb9b43ea01e8d
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
<<<<<<< HEAD
          signJwtToken(body, config, res)
=======
          jwt.sign(body, JWT_PRIVATE_KEY, config, (error, token) => {
            if (error) res.status(500).send(error)
            res.send({ idToken: token })
          })
>>>>>>> b31c3145d2c568d5242cea2529dcb9b43ea01e8d
        }
      }
    )
  })
}

// module.exports = verifyJwtToken
