const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/GymnasiumManagementSystem");

connect.then(() => {
    console.log("Mongodb connected");
}).catch(() => {
    console.log("Failed to connect");
})

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