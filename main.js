const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv = require('dotenv');
const adminrouter = require('./Router/adminrouter');

dotenv.config()
const app= express();
app.use(express.json());
app.use(cors());

let corsoptions={
    origin:['http://localhost:5000']
},
port=5000;
app.listen(port,(req,res)=>{
    console.log('listening port 5000')
});
url="mongodb://localhost:27017/backend"
 mongoose.connect(url)
 .then(console.log('database connected successfully'))
 .catch(err=>{
    console.log("error",err)
})
app.use('/',cors(corsoptions),adminrouter)