const data = require('./mobileData.json')

module.exports = (app) => {
  app.get('/mobile/get', (req, res) => {
    res.send(data)
    console.log(`/mobile/get --- ${new Date()}`)
  })

  app.get('/mobile/get/:id', (req, res) => {
    const id = req.params.id
    const item = data.find((item) => item.id == id)
    res.send(item)
    console.log('/mobile/get/:id')
  })
}
