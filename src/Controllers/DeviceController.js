const mongoose = require('mongoose')
const Device = require('../Models/Device')

module.exports = (app) => {
  //Get all devices
  app.get('/device', (req, res) => {
    Device.find({}, (err, devices) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(devices)
    })
  })

  app.post('/device', (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const serialNumber = req.body.serialNumber
    try{
      const newDevice = new Device({
        _id: mongoose.Types.ObjectId(),
        serialNumber: serialNumber
      })
  
      newDevice.save((err) => {
        if (err) return console.error(err)
        res.send(newDevice)
      })
    }catch(err){
      console.log(err)
    }
  })

  app.put('/device/:id',(req,res)=>{
    if (!req.body) return res.sendStatus(400)
    const id = req.params.id;
    const serialNumber = req.body.serialNumber;

    try{
      const newDevice = new Device({
        _id:id,
        serialNumber: serialNumber
      })

      Device.findOneAndUpdate({_id:id},newDevice, {new:true},(err,device)=>{
        if(err) return console.log(err); 
        res.send(newDevice);
      })

    }catch(err){
      console.error(err);
    }
  })

  app.get('/device/:id',(req,res)=>{

    const id = req.params.id;
    Device.findById(id, (err, device) => {
      if (err) {
        console.error(err)
        res.sendStatus(400)
        return
      }
      res.send(device)
    })
  })
}
