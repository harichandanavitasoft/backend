const express = require('express');
const route = express.Router();
const cors = require('cors');
const assignments = require('../Model/addasssignmentmodel');
let corsoptions={
    origin:['http://localhost:5000']
}
route.post('/addassignment',cors(corsoptions),(req,res)=>{
    const assignment = new assignments(req.body)
    assignment.save();
    res.status(201).json(assignment)

})
route.get('/assignments',cors(corsoptions),async(req,res)=>{
   try{
    const assignment = await assignments.find()
    res.status(201).json(assignment);
   }
   catch(error){
     res.status(501).json({message : " internal server error"})

   }
})
module.exports=route;