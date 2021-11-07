const jwt = require('jsonwebtoken')
const { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY } = process.env

const signJwtToken = (body, config, res) => {
  jwt.sign(body, JWT_PRIVATE_KEY, config, (error, token) => {
    if (error) res.status(500).send(error)
    res.status(200).send({ idToken: token })
  })
}

const verifyJwtToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, JWT_PRIVATE_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }
      req.user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}
module.exports = {
  signJwtToken,
  verifyJwtToken
}
