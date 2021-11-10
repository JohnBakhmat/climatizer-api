const { Server } = require('socket.io')

module.exports = (server) => {
  const io = new Server(server)
  io.on('connection', (socket) => {
    socket.on('get-device-data', (data) => {
      const info = JSON.parse(data)
    })
  })
}
