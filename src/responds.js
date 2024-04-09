const mongoose = require('mongoose');

//user responds
const RespondsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const collection1 = new mongoose.model("RespondsCollection",RespondsSchema)

module.exports=collection1
