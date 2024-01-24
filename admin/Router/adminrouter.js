const  express = require('express');
const route = express.Router();
const cors= require('cors');
const jwt = require('jsonwebtoken')

const admindata = require('../Model/adminloginmodel');

 let corsoptions={
    origin:['http://localhost:5000']
 }
route.post('/admin/create',cors(corsoptions),(req,res)=>{
    const ad = new admindata(req.body)
    ad.save();
    res.status(201).json(ad)
    
});
route.post('/admin/login', cors(corsoptions), async(req,res)=>{
  try{
    const adminLogin = await admindata. findOne(req.body);
    if(!adminLogin){
      res.status(404).json('admin not found');
  }
  const secretKey = 'my-secretKey';
        const token = jwt.sign({ "username":req.body.username, "password":req.body.password},secretKey,{ expiresIn: '1h'})
        res.status(201).json({adminLogin,token})
    }
    catch(err){
      res.status(500).json({err:'admin login failed'})

  }
    
});


module.exports= route;