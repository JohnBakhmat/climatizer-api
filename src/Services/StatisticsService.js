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
      statEvents = statEvents.map((event) => {
        const date = new Date(event.dateTime)
        const timeStamp = `${date.getHours()}:00 ${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
        return {
          ...event,
          dateTime: timeStamp
        }
      })
      res.send(_.countBy(statEvents, 'dateTime'))
    })
  })

  app.get('/stat/actions', (req, res) => {
    StatEvent.find({}, (err, statEvents) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      statEvents = statEvents.map((event) => {
        const date = new Date(event.dateTime)
        const timeStamp = `${date.getHours()}:00 ${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
        return {
          ...event,
          dateTime: timeStamp
        }
      })
      res.send(_.countBy(statEvents, 'dateTime'))
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
