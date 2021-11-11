module.exports = (socket) => {
  socket.on('get-device-data', (data) => {
    const info = JSON.parse(data)
  })
}
