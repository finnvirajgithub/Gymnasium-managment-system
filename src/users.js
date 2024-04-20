const mongoose = require('mongoose');

//user responds
const UsersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    height:{
        type:String,
        required:true
    },
     
})

const userdb = new mongoose.model("UsersCollection",UsersSchema)

module.exports=userdb
