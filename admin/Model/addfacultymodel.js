const mongoose =require('mongoose')
const schema = mongoose.Schema;
const faculty = new schema({
    fullname:{
        type:String,
        required:true
    },
    facultyid:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        require:true
    },
    year:{
        type:String,
        requiredd:true
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        enum:['male','female'],
        type:String,
        required:true,
       
    },
    mobileno:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    image:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);
module.exports= mongoose.model('faculty',faculty)