const express = require('express');
const route = express.Router();
const cors = require('cors');
const multer=require('multer')
const facultydata = require('../Model/addfacultymodel');
let corsoptions={
    origin:['http://localhost:5000']
}
const image = multer.diskStorage({
    destination:'images/',
    filename:(req,file,pic)=>{
        pic(null,Date.now()+file.originalname);
    },
});
 const upload = multer({
    storage:image,
 })
route.post('/faculty/create' ,cors(corsoptions), upload.single('file') , (req,res)=>{
    const faculty = new facultydata(req.body,req.file)
    faculty.save();
    res.status(201).json(faculty)


})
route.get('/getfaculty',cors(corsoptions),async(req,res)=>{
    try{
    const allfaculty = await facultydata.find()
    res.status(201).json(allfaculty)
    }
    catch(error){
        console.error(error);
        res.status(501).json({ message: 'Internal Server Error' });

    }
});
route.put('/editfaculty/:id',cors(corsoptions),async(req,res)=>{
    const faculty = await facultydata.findByIdAndUpdate(req.params.id,req.body)
    res.status(201).json(faculty)
    
});

route.delete('/deletefaculty/:id',cors(corsoptions),async(req,res)=>{
   const faculty = await facultydata.findByIdAndDelete(req.params.id)
   res.status(201).json(faculty)
})
module.exports=route;
