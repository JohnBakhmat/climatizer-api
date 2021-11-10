const cron = require('node-cron')
const { spawn } = require('child_process')

const handleBackupCreation = () => {
  const date = new Date()
  const timeStamp = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
  const backupProcess = spawn('mongodump', [
    '--db=test',
    `--archive=./backups/${timeStamp}.gz`,
    '--gzip'
  ])

  backupProcess.on('exit', (code, signal) => {
    if (code) console.log('Backup process exited with code ', code)
    else if (signal)
      console.error('Backup process was killed with singal ', signal)
    else console.log('Successfully backedup the database')
  })
}

const restoreLastBackup = (date) => {
  const timeStamp = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
  const backupProcess = spawn('mongorestore', [
    '--db=test',
    `--archive=./backups/${timeStamp}.gz`,
    '--gzip'
  ])
  backupProcess.on('exit', (code, signal) => {
    if (code) console.log('Backup process exited with code ', code)
    else if (signal)
      console.error('Backup process was killed with singal ', signal)
    else console.log('Successfully backedup the database')
  })
}

const dbBackupTask = cron.schedule('59 23 * * *', () => {
  handleBackupCreation()
})
// console.log(dbBackupTask)
