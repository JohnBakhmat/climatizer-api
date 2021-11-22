const http = require('http')
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const app = require('./app')
const server = http.createServer(app)

const { API_PORT } = process.env
const port = API_PORT || 3030
const host = '192.168.0.106'
require('./Data/MongoService')(() => {
  server.listen(port, host, () => {
    console.clear()
    console.log(`Server running on http://192.168.0.106:${port}`)
  })
})
