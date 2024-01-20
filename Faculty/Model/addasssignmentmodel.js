const mongoose = require('mongoose');
const schema = mongoose.Schema;
const assignment = new schema({
    question:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    facultyid:{
    type:String,
    required:true
    }

},
{
    timestamps:true
}
)
module.exports=mongoose.model('assignment',assignment)