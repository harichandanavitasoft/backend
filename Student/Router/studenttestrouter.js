const express =  require('express');
const cors= require('cors');
const testdata = require('../Model/studentestmodel');
const route= express.Router()
let corsoptions ={
    origin:['http://localhost:5000']

}
route.post('/tests',cors(corsoptions),(req,res)=>{
    
    const test = new testdata(req.body);
    test.save();
    res.status(201).json(test);

});
route.get('/gettests',cors(corsoptions),async(req,res)=>{
    try{
        const test = await testdata.find()
        res.status(201).json(test)
      }
    catch(error){
        console.log(error);
        res.status(500).json("test details not found")



    }
})
module.exports=route;