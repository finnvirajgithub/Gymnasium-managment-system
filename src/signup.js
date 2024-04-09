const mongoose = require('mongoose');

//user login
const LogInSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = new mongoose.model("LogInCollection",LogInSchema)

module.exports=collection