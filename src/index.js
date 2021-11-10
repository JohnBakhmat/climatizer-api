const http = require('http')
const mongoose = require('mongoose')

const app = require('./app')
const server = http.createServer(app)

const { API_PORT, MONGO_URI } = process.env
const port = process.env.PORT || API_PORT

require('./Services/Sockets/DeviceSocketService')(server)

// server listening
mongoose.connect(MONGO_URI, (err) => {
  err && console.error(err)
  server.listen(port, () => {
    console.clear()
    console.log(`Server running on http://localhost:${port}`)
  })
})
