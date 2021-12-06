const cron = require('node-cron')
const { spawn } = require('child_process')

const handleBackupCreation = () => {
  const date = new Date()
  const timeStamp = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
  const backupProcess = spawn('mongodump', [
    '--db=test',
    `--out=src/Data/backups/${timeStamp}`
    // '--gzip'
  ])

  backupProcess.on('exit', (code, signal) => {
    if (code) console.log('Backup process exited with code ', code)
    else if (signal)
      console.error('Backup process was killed with singal ', signal)
    else console.log(`Successfully backedup the database ${timeStamp}.gz`)
  })
}

const restoreBackup = (backup, callback) => {
  const backupProcess = spawn('mongorestore', [
    '--db=test',
    `src/Data/backups/${backup}/test`
  ])
  backupProcess.on('exit', (code, signal) => {
    if (code) console.log('Backup process exited with code ', code)
    else if (signal)
      console.error('Backup process was killed with singal ', signal)
    else callback('Successfully backedup the database')
  })
}

const dbBackupTask = cron.schedule('59 */2 * * * *', () => {
  handleBackupCreation()
})

module.exports = {
  restoreBackup
}
