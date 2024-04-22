const mongoose = require('mongoose');

//user responds
const TrainerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    fee:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
})

const trainerdb = new mongoose.model("TrainerCollection",TrainerSchema)

module.exports=trainerdb
