const express = require('express');
const route = express.Router();
const cors = require('cors');
const multer=require('multer')
const facultydata = require('../Model/addfacultymodel');
const verifyToken= require('../../jwt/verifytoken')
let corsoptions={
    origin:['http://localhost:5000']
}
const storage = multer.diskStorage({
    destination:'images/',
    filename:(req,file,pic)=>{
        pic(null,Date.now()+'-'+file.originalname);
    },
});
 const upload = multer({storage})


route.post('/faculty/create' ,cors(corsoptions),verifyToken, upload.single('image') ,async(req,res)=>{
    const faculty = new facultydata (req.body)
    faculty.save();
      res.status(201).json(faculty)
});





//     if(!req.file){
//         return res.status(400).json({error:'nofile'})
//     }
//     var data={
//         fullname:req.body.fullname,
//         facultyid:req.body.facultyid,
//         email:req.body.email,
//         branch:req.body.branch,
//         year:req.body.year,
//         address:req.body.address,
//         gender:req.body.gender,
//         mobileno:req.body.mobileno,
//         subject:req.body.subject,
//         designation:req.body.designation,
//         // image:req.file.filename,
//         password:req.body.password
      
//          }
//     try{
//         const photo= await facultydata.create(data)
//         return res.status(200).json(photo)
//     }
//     catch(err){
//         return res.status(500).json(err)
//     }
// });
 
route.get('/getfaculty',cors(corsoptions),verifyToken,async(req,res)=>{
    try{
    const allfaculty = await facultydata.find()
    res.status(201).json(allfaculty)
    }
    catch(error){
        console.error(error);
        res.status(501).json({ message: 'Internal Server Error' });

    }
});
route.put('/editfaculty/:id', verifyToken,cors(corsoptions),async(req,res)=>{
    console.log(req.body);
    const faculty = await facultydata.findByIdAndUpdate(req.body.id,req.body)
    res.status(201).json(faculty)
    
});

route.delete('/deletefaculty/:id', verifyToken,cors(corsoptions),async(req,res)=>{
   const faculty = await facultydata.findByIdAndDelete(req.params.id)
   res.status(201).json(faculty)
});


module.exports=route;
