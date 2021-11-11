class ClientSocketService {
  socket = 0
  constructor(socket) {
    this.socket = socket
  }
  handleNotification(notification) {
    this.socket.emit(notification)
  }
}

module.exports = (socket) => new ClientSocketService(socket)
