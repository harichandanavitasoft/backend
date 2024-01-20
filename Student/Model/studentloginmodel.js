const mongoose = require('mongoose');
const schema = mongoose.Schema;
const student = new schema({
   
    hallticketno:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileno:{
        type:Number,
        required:true
    },
    dateofbirth:{
        type:String,
        required:true
    },
    gender:{
        enum:['male','female'],
        type:String,
        required:true,
    },
    branch:{
        type:String,
        requrired:true

    },
    address:{
        type:String,
        required:true

    },
    // image:{
    //     type:String,
    //     required:true

    // },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}

);
module.exports=mongoose.model('student',student)