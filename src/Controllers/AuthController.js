const jwt = require('jsonwebtoken')
const privateKey = '1a2b-3c4d-5e6f-7g8h'
module.exports = (app) => {
  // Register
  app.post('/register', (req, res) => {
    // our register logic goes here...
    const body = req.body
    
    jwt.sign(body, privateKey, { algorithm: 'HS256' }, (error, token) => {
      if (error) res.status(500).send(error)
      res.send({ idToken: token })
    })
  })

  // Login
  app.post('/login', (req, res) => {
    // our login logic goes here
    const body = req.body

    jwt.sign(body, privateKey, { algorithm: 'HS256' }, (error, token) => {
      if (error) res.status(500).send(error)
      res.send({ idToken: token })
    })
  })
}
