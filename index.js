const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcrypt");
const mongoose = require("./src/mongodb")
const collection = require("./src/signup");
const collection1 = require("./src/responds");

const stripe = require("stripe");
const dotenv = require("dotenv");
const admin = require("./src/admin");
const userdb = require("./src/users");
const storedb = require("./src/store");
const workoutdb = require("./src/workout");
const trainerdb = require("./src/trainer");
//load variables 
dotenv.config();

const templatePaths = path.join(__dirname,'');

app.use(express.static(__dirname,''));
app.use(express.json());
app.set("view engine","hbs");
app.set("views",templatePaths);
app.use(express.urlencoded({extended:false}));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}


// routing
app.get("/",(req,res) => {
    res.render("index")
})

app.get("/index",(req,res) => {
    res.render("index")
})

app.get("/about",(req,res) => {
    res.render("about")
})

app.get("/services",(req,res) => {
    res.render("services")
})

app.get("/login",(req,res) => {
    res.render("login")
})

app.get("/signup",(req,res) => {
    res.render("signup")
})

app.get("/contact",(req,res) => {
    res.render("contact")
})

app.get("/success",(req,res) => {
    res.render("success")
})

app.get("/cancel",(req,res) => {
    res.render("cancel")
})

app.get("/loginIndex",(req,res) => {
    res.render("loginIndex")
})

app.get("/loginAbout",(req,res) => {
    res.render("loginAbout")
})

app.get("/loginServices",(req,res) => {
    res.render("loginServices")
})

app.get("/profile",(req,res) => {
    res.render("profile")
})

app.get("/coaching",(req,res) => {
    res.render("coaching")
})

app.get("/loginOption",(req,res) => {
    res.render("loginOption")
})

app.get("/adminLogin",(req,res) => {
    res.render("adminLogin")
})

app.get("/adminHome",(req,res) => {
    res.render("adminHome")
})

app.get("/getUserDeatils",(req,res) => {
    res.render("getUserDetails")
})

app.get("/workout",(req,res) => {
    res.render("workout")
})

app.get("/cardio",(req,res) => {
    res.render("cardio")
})

app.get("/muscle",(req,res) => {
    res.render("muscle")
})

app.get("/cardioplanes",(req,res) => {
    res.render("cardioplanes")
})

app.get("/abs",(req,res) => {
    res.render("abs")
})


//code for signup
app.post("/signup",async (req,res)=> {
    console.log("hello2")
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

        res.render("getUserDetails");
    } 
})

//code for collection responds
app.post("/getUserDetails",async (req,res) => {
    console.log("hello")
    const data2 = {
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone,
        weight:req.body.weight,
        height:req.body.height,
    }

    const responds = await userdb.insertMany(data2);
    console.log(responds);
    res.render("loginIndex");

});

//code for collection responds
app.post("/contact",async (req,res) => {
    const data1 = {
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        message:req.body.message
    }

    const responds = await collection1.insertMany(data1);
    console.log(responds);

    res.render("contact");
});

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
            res.render("loginIndex");
        }else{
            req.send("Incorrect Password.");
        }
    }catch{
        res.send("Incorrect Username or Password.");
    };
});

//code for admin login
app.post("/adminLogin", async (req,res)=> {
    try{
        const check = await admin.findOne({username: req.body.username});
        if(!check){
            res.send("Username can not found.")
        }

        //compare the password from the database with the plain text
        if(check.password==req.body.password){
            res.render("adminHome");
        }else{
            req.send("Incorrect Password.");
        }
    }catch{
        res.send("Incorrect Username or Password.");
    };
});

//code for fetch customer details
app.post("/customerDetails", async (req,res)=> {
    try{
        const check = await admin.findOne({username: req.body.username});
        if(!check){
            res.send("Username can not found.")
        }

        //compare the hash password from the database with the plain text
        const isPasswordMatch = await compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.render("adminHome");
        }else{
            req.send("Incorrect Password.");
        }
    }catch{
        res.send("Incorrect Username or Password.");
    };
});


//load customer details

app.get("/customerDetails", async (req, res) => {
    try {
        const userscollections = await userdb.find({}).exec();
        res.render("customerDetails", {
            usersList: userscollections  // Pass retrieved users to the template
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching users");
    }
});

//load workout details

app.get("/adminWorkout", async (req, res) => {
    try {
        const workoutcollections = await workoutdb.find({}).exec();
        res.render("adminWorkout", {
            workoutList: workoutcollections  // Pass retrieved workouts to the template
        });
    } catch (err) {
        console.error("Error fetching workout:", err);
        res.status(500).send("Error fetching workouts");
    }
});

app.get("/upper", async (req, res) => {
    try {
        const workoutcollections = await workoutdb.find({}).exec();
        res.render("upper", {
            workoutList: workoutcollections  // Pass retrieved workouts to the template
        });
    } catch (err) {
        console.error("Error fetching workout:", err);
        res.status(500).send("Error fetching workouts");
    }
});

//load Trainer details

app.get("/adminTrainer", async (req, res) => {
    try {
        const trainercollections = await trainerdb.find({}).exec();
        res.render("adminTrainer", {
            trainerList: trainercollections  // Pass retrieved Trainer to the template
        });
    } catch (err) {
        console.error("Error fetching Trainer:", err);
        res.status(500).send("Error fetching Trainer");
    }
});

//load Trainer details to user services

app.get("/trainers", async (req, res) => {
    try {
        const trainercollections = await trainerdb.find({}).exec();
        res.render("trainers", {
            trainerList: trainercollections  // Pass retrieved Trainer to the template
        });
    } catch (err) {
        console.error("Error fetching Trainer:", err);
        res.status(500).send("Error fetching Trainer");
    }
});

//code for add item
app.post("/adminStore",async (req,res) => {
    const data2 = {
        title:req.body.title,
        price:req.body.price,
        image:req.body.image,
    }

    const responds = await storedb.insertMany(data2);
    console.log(responds);
    res.render("adminStore");

});

//code for add workout
app.post("/adminWorkout",async (req,res) => {
    const data2 = {
        title:req.body.title,
        type:req.body.type,
        purpose:req.body.purpose,
        image1:req.body.image1,
        image2:req.body.image2,
        image3:req.body.image3,
    }

    const responds = await workoutdb.insertMany(data2);
    console.log(responds);
    res.render("adminWorkout");

});

//code for add item
app.post("/adminTrainer",async (req,res) => {
    const data2 = {
        name:req.body.name,
        level:req.body.level,
        fee:req.body.fee,
        image:req.body.image,
    }

    const responds = await trainerdb.insertMany(data2);
    console.log(responds);
    res.render("adminTrainer");

});
 
//load store items into admin store
app.get("/adminStore", async (req, res) => {
    try {
        const storecollections = await storedb.find({}).exec();
        res.render("adminStore", {
            itemList: storecollections  // Pass retrieved users to the template
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching Items");
    }
});

//load store items into store
app.get("/loginStore", async (req, res) => {
    try {
        const storecollections = await storedb.find({}).exec();
        res.render("loginStore", {
            itemList: storecollections  // Pass retrieved users to the template
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching Items");
    }
});

//load store items into store
app.get("/store", async (req, res) => {
    try {
        const storecollections = await storedb.find({}).exec();
        res.render("store", {
            itemList: storecollections  // Pass retrieved users to the template
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching users");
    }
});
//stripe

let stripeGetway = stripe(process.env.stripe_api);
let DOMAIN = process.env.DOMAIN;

app.post("/stripe-checkout", async (req,res) => {
    const lineItems = req.body.items.map((item) => {
        const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, "") * 100); 
        console.log("item-price:", item.price);
        console.log("unitAmount:", unitAmount);
        return {
            price_data: {
                currency: "usd",
                procuct_data: {
                    name: item.title,
                    images: [item.procuctImg]
                },
                unit_amount: unitAmount,
            },
            quantity: item.quantity,
        };
    });
    console.log("lineItems:", lineItems);

    //create checkout session
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/cancel`,
        line_items: lineItems,
        //asking address in stripe checkout page
        billing_address_collection: "required",
    });
    res.json(session.url);  
});



app.listen(3000, () => {
    console.log("Port connected");
});

