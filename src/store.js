const mongoose = require('mongoose');

//user responds
const StoreSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
})

const storedb = new mongoose.model("StoreCollection",StoreSchema)

module.exports=storedb
