const express=require('express');
const route=  express.Router();
const cors=require('cors');
const facultydata = require('../Model/facultyloginmodel');
const jwt = require('jsonwebtoken')
const verifytoken = require('../../jwt/verifytoken')
let corsoptions={
    origin:['http://localhost:5000']
 }

route.post('/faculty/login',cors(corsoptions),async(req,res)=>{
  try{
  const faculty= await facultydata.findOne(req.body);
  if(!faculty){
      res.status(404).json('faculty not found')
}
    const secretKey = 'my-secretKey';
     const token = jwt.sign({ "facultyid":req.body.facultyid, "password":req.body.password},secretKey,{ expiresIn: '1h'})
    res.status(201).json({faculty,token})
}
  catch{
      res.status(500).json(' faculty login failed')
  }

});

route.post('/faculty/password', verifytoken,cors(corsoptions),async(req,res)=>{
  const faculty= await facultydata.findOne(req.body);
  if(faculty){
      res.status(201).json(faculty)

  }
  else{
      res.status(500).json('login failed')
  }
   
});


route.get('/facultyid/:id',verifytoken, cors(corsoptions),async(req,res)=>{
  try{
  const profile=await facultydata.findById(req.params.id);
  res.status(200).json(profile);
  }
  catch(error){
   res.status(500).json({ error:"faculty not found"});
  }
});


module.exports=route;