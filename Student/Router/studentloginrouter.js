const express= require('express');
const route = express.Router();
const cors = require('cors');
const  studentdata = require('../Model/studentloginmodel');
const multer = require('multer');
const jwt = require('jsonwebtoken')
const verifytoken= require('../../jwt/verifytoken')
let corsoptions={
    Option:['http://localhost:5000']
}
const image = multer.diskStorage({
    destination:'images/',
    filename:(req,file,img)=>{
        Pic(null,Date.now()+file.originalname);
    },
});
const upload= multer({
    storage:image,
})
route.post('/student/create',cors(corsoptions),(req,res)=>{
    const student = new studentdata(req.body)
  student.save();
    res.status(201).json(student)

});
route.post('/student/login',cors(corsoptions),async(req,res)=>{
    try{
    const student= await studentdata.findOne(req.body);
    if(!student){
        res.status(404).json('student not found')

    }
    const secretKey = 'my-secretKey';
    const token = jwt.sign({"hallticketno":req.body.hallticketno,"password":req.body.password},secretKey,{ expiresIn: '1h'})
    res.status(201).json({student,token})
}
    catch{
        res.status(500).json('student login failed')
    }
});
route.post('/student/forgotpassword',verifytoken,cors(corsoptions),async(req,res)=>{
    const student= await studentdata.findOne(req.body);
    if(student){
        res.status(201).json(student)

    }
    else{
        res.status(500).json('login failed')
    }
});
route.get('/studentprofile/:id', verifytoken,cors(corsoptions),async(req,res)=>{
    try{
     const profile = await studentdata.findById(req.params.id)
     res.status(201).json(profile)
    }
    catch{
        res.status(500).json('studentnt not found')

    }
})
route.post('/test',verifytoken,cors(corsoptions),(req,res)=>{
    const test = new studentdata(req.body);
    res.status(201).json(test)
});

route.get('/getstudents', verifytoken,cors(corsoptions),async(req,res)=>{
    try{
    const allstudents = await studentdata.find()
    res.status(201).json(allstudents)
    }
    catch(error){
        console.error(error);
        res.status(501).json({ message: 'Internal Server Error' });

    }
});
route.put('/editstudent/:id',verifytoken,cors(corsoptions),async(req,res)=>{
    console.log(req.body);
    const student = await studentdata.findByIdAndUpdate(req.body.id,req.body)
    res.status(201).json(student)
    
});

module.exports=route;