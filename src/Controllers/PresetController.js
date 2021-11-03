const { Types } = require('mongoose')
const Preset = require('../Models/Preset')

module.exports = (app) => {
  app.get('/preset', (req, res) => {
    Preset.find({}, (err, rooms) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(rooms)
    })
  })
  app.get('/preset/:id', (req, res) => {
    const id = req.params.id
    Preset.findById(id, (err, room) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(room)
    })
  })
  app.post('/preset', (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const body = req.body
    try {
      const newPreset = new Preset({
        _id: Types.ObjectId(),
        title: body.title,
        description: body.description
      })
      newPreset.save((error) => {
        throw error
      })
    } catch (e) {
      console.error(e)
      res.sendStatus(400)
    }
  })
  app.put('/preset/:id', (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const id = req.params.id
    const body = req.body

    try {
      const newPreset = new Room({
        _id: id,
        title: body.title,
        description: body.description
      })

      Preset.findOneAndUpdate(
        { _id: id },
        newPreset,
        { new: true },
        (err, room) => {
          if (err) return console.log(err)
          res.send(room)
        }
      )
    } catch (err) {
      console.error(err)
    }
  })

  app.delete('/preset/:id', (req, res) => {
    const id = req.params.id
    Preset.findByIdAndDelete(id, (err, room) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(room)
    })
  })
}
