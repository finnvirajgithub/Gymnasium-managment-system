const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcrypt");
const collection = require("./mongodb");

const templatePaths = path.join(__dirname,'../templates')

app.use(express.static("css"));
app.use(express.json());
app.set("view engine","hbs");
app.set("views",templatePaths);
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res) => {
    res.render("index")
})

app.get("/login",(req,res) => {
    res.render("login")
})

app.get("/signup",(req,res) => {
    res.render("signup")
})


//code for signup
app.post("/signup",async (req,res)=> {
    const data = {
        username:req.body.email,
        password:req.body.password2
    }

    //check if the user already exists in the database

    const existingUser = await collection.findOne({username: data.username});
    if(existingUser){
        res.send("User already exists");
    }else{

        //hash the password using bcrypt
        const saltRounds = 10; //number of the salt rounds for bcrypt
        const hashPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashPassword; // replace the hash password with the original password

        const userdata = await collection.insertMany(data);
        console.log(userdata);

        res.render("index");
    } 
})

//code for login
app.post("/login", async (req,res)=> {
    try{
        const check = await collection.findOne({username: req.body.username});
        if(!check){
            res.send("Username can not found.")
        }

        //compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.render("index");
        }else{
            req.send("Incorrect Password.");
        }
    }catch{
        res.send("Incorrect Username or Password.");
    };
});

app.listen(3000, () => {
    console.log("Port connected");
});