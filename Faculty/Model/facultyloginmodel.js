const mongoose = require('mongoose');
const schema = mongoose.Schema;
const faculty = new schema({
    facultyid:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("faculties",faculty)