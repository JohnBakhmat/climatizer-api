const http = require('http')
const mongoose = require('mongoose')

const app = require('./app')
const server = http.createServer(app)

const { API_PORT } = process.env
const port = API_PORT || 3030

require('./Services/Sockets/SocketService')(server)
require('./Data/MongoService')(() => {
  server.listen(port, () => {
    console.clear()
    console.log(`Server running on http://localhost:${port}`)
  })
})
