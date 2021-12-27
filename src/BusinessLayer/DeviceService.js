module.exports = (app) => {
  app.post('/device/data', (req, res) => {
    console.log(req.body)
  })
}
