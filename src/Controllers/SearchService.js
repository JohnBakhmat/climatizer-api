const { verifyJwtToken } = require('../Middleware/JwtService')
module.exports = (app) => {
  app.post('/search/', verifyJwtToken)
}
