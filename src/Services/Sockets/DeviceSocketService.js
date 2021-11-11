class DeviceSocketService {
  socket
  constructor(socket) {
    this.socket = socket
  }

  handleSetDeviceSettings = (preset) => {
    socket.emit('set-device-settings', preset)
  }
}

module.exports = (socket) => {
  socket.on('get-device-data', (data) => {
    const info = JSON.parse(data)
  })
  return new DeviceSocketService(socket)
}
