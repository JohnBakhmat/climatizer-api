const fs = require('fs')
const path = require('path')
const directoryPath = path.join(__dirname, './backups')
const { verifyJwtToken } = require('../Middleware/JwtService')
const { restoreLastBackup, restoreBackup } = require('./BackupCRON')

module.exports = (app) => {
  app.get('/backups', verifyJwtToken, (req, res) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        const message = 'Unable to scan directory: ' + err
        console.log(message)
        res.send(message)
      }

      res.send(files)
    })
  })

  app.post('/apply-backup', verifyJwtToken, (req, res) => {
    const backup = req.body?.backup
    console.log(`We need to restore this backup: ${backup}`)
    restoreBackup(backup, (success) => {
      console.log(success)
      res.send(success)
    })
  })
}
