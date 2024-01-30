const express =  require('express');
const cors= require('cors');
const testdata = require('../Model/studentestmodel');
const route= express.Router()
const verifytoken= require('../../jwt/verifytoken')
let corsoptions ={
    origin:['http://localhost:5000']

}
route.post('/tests',verifytoken,cors(corsoptions),(req,res)=>{
    
    const test = new testdata(req.body);
    test.save();
    res.status(201).json(test);

});

route.get('/gettests',verifytoken,cors(corsoptions),async(req,res)=>{
    try{
        const test = await testdata.find()
        res.status(201).json(test)
      }
    catch(error){
        console.log(error);
        res.status(500).json("test details not found")



    }
});

route.put('/edittest/:id',verifytoken,cors(corsoptions),async(req,res)=>{
    
    const student = await testdata.findByIdAndUpdate(req.body.id,req.body)
    res.status(201).json(student)

})


module.exports=route;