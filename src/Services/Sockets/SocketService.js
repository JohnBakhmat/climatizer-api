const { Server } = require('socket.io')
const Client = require('./ClientSocketService')
module.exports = (server) => {
  const io = new Server(server)
  io.on('connection', (socket) => {
    const client = Client(socket)
    client.handleNotification('2141324')
  })
}
