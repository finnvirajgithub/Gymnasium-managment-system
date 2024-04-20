const mongoose = require('mongoose');

//user login
const AdminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const admin = new mongoose.model("Admin",AdminSchema)

module.exports=admin