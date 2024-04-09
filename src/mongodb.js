const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/GymnasiumManagementSystem");

connect.then(() => {
    console.log("Mongodb connected");
}).catch(() => {
    console.log("Failed to connect");
})

module.exports = mongoose.connection;


