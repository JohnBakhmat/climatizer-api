const DeviceData = require('../Models/DeviceData')

module.exports = (app) => {
  app.get('/mobile/get', (req, res) => {
    DeviceData.find({}, (error, data) => {
      const abc = data.map((item) => ({
        id: item._id,
        name: item.name,
        description: item.description,
        temperature: item.temperature,
        humidity: item.humidity,
        co: item.co
      }))
      console.log(abc)
      res.send(abc)
    })
    console.log(`/mobile/get --- ${new Date()}`)
  })

  app.get('/mobile/get/:id', (req, res) => {
    const id = req.params.id
    const item = data.find((item) => item.id == id)
    res.send(item)
    console.log('/mobile/get/:id')
  })
}
