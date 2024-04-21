const mongoose = require('mongoose');

//workouts
const WorkoutSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    purpose:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    image1:{
        type:String,
        required:true
    },
    image2:{
        type:String,
        required:true
    },
    image3:{
        type:String,
        required:true
    },
})

const workoutdb = new mongoose.model("WorkoutCollection",WorkoutSchema)

module.exports=workoutdb
