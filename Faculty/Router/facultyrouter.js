const express=require('express');
const route=  express.Router();
const cors=require('cors');
const facultydata = require('../Model/facultyloginmodel');
let corsoptions={
    origin:['http://localhost:5000']
 }

route.post('/faculty/login',cors(corsoptions),async(req,res)=>{
  
    const faculty =await facultydata.findOne(req.body);
    if(faculty){
        res.status(201).json(faculty);
      }else{
        res.status(500).json('faculty login failed'); 
      }
});
route.get('/facultyid/:id',cors(corsoptions),async(req,res)=>{
  try{
  const profile=await facultydata.findById(req.params.id);
  res.status(200).json(profile);
  }
  catch(error){
   res.status(501).json({ error:"faculty not found"});
  }
});


module.exports=route;