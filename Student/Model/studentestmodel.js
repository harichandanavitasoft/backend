const mongoose=require('mongoose');
const schema = mongoose.Schema;
const test = new schema({
    hallticketno:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        requried:true
    }


},
{
    timestamps:true
}

);
module.exports=mongoose.model('tests',test)