const StatEvent = require('../Models/StatEvent')
const _ = require('lodash')
module.exports = (app) => {
  app.get('/stat/logins', (req, res) => {
    StatEvent.find({ type: 'Login' }, (err, statEvents) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(statEvents)
    })
  })

  app.get('/stat/actions', (req, res) => {
    StatEvent.find({ type: { $ne: 'Login' } }, (err, statEvents) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(statEvents)
    })
  })

  app.get('/stat/devices', (req, res) => {
    StatEvent.find({}, (err, statEvents) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }

      res.send(_.countBy(statEvents, 'deviceType'))
    })
  })
}
