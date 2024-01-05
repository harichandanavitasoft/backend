const  express = require('express');
const route = express.Router();
const cors= require('cors');

const admindata = require('../Model/adminloginmodel')
 let corsoptions={
    origin:['http://localhost:5000']
 }
route.post('/admin/create',cors(corsoptions),(req,res)=>{
    const ad = new admindata(req.body)
    ad.save();
    res.status(201).json(ad)
    
});
route.post('/admin/login',cors(corsoptions), async(req,res)=>{
    const adminLogin = await admindata. findOne(req.body);
    if(adminLogin){
        res.status(201).json(adminLogin);
      }else{
        res.status(500).json('user login failed'); 
      }
});


module.exports= route;