const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/GymnasiumManagementSystem");

connect.then(() => {
    console.log("Mongodb connected");
}).catch(() => {
    console.log("Failed to connect");
})


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

module.exports=collection
module.exports=collection1