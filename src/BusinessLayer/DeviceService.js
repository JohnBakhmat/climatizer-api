const DeviceData = require('../Models/DeviceData')
const Mongoose = require('mongoose')
module.exports = (app) => {
  app.post('/device/data', (req, res) => {
    const newData = new DeviceData({
      _id: Mongoose.Types.ObjectId(req.body.DeviceId),
      name: req.body.Name,
      description: req.body.description,
      temperature: req.body.T,
      humidity: req.body.H,
      co: req.body.CO,
      fetchTime: req.body.DateTime
    })
    DeviceData.findOneAndUpdate(
      { _id: newData._id },
      newData,
      { upsert: true, new: true },
      (err, room) => {
        if (err) return console.log(err)
        res.sendStatus(200)
      }
    )

    // newData.save((error) => {
    //   error && console.error(error)
    // })
  })
}
