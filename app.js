require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const User = require("./models/User");
const expressSession = require("express-session");


/**
 * Controllers (route handlers).
 */

  const userController = require("./controllers/user");
  const languageController = require("./controllers/language");
 
 const app = express();
 app.set("view engine", "ejs");

 /**
 * pulling the values from our environment
 */

const { WEB_PORT, MONGODB_URI } = process.env;

/**
 * connect to database
 */

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    
  );
  process.exit();
});

/***
 * We are applying our middlewear
 */
 app.use(express.static(path.join(__dirname, "public")));

 app.use(express.json()); //Used to parse JSON bodies

 app.use(express.urlencoded()); //Parse URL-encoded bodies

 app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))



 global.user = false;
 app.use("*", async (req, res, next) => {
   if (req.session.userID && !global.user) {
     const user = await User.findById(req.session.userID);
     global.user = user;
   }
   next();
 })
 
 const authMiddleware = async (req, res, next) => {
   const user = await User.findById(req.session.userID);
   if (!user) {
     return res.redirect('/');
   }
   next()
 }

// @route GET /
// @description Get home page
// @access Public

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.get("/", languageController.list);

app.get("/view/:id", languageController.view);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

// @route GET /languages
// @description Get all languages
// @access Public
app.get("/languages", languageController.list);

 
// @route GET /join
// @description Get registration page
// @access Public
app.get("/join", (req, res) => {
  res.render("create-user");
});

// @route POST /create-user
// @description Create a new user
// @access Public
app.post("/create-user", userController.create);

// @route GET /login
// @description Get login page
// @access Public

app.get("/login", (req, res) => {
  res.render("login-user");
});

// @route POST /login-user
// @description Send login info
// @access Public
app.post("/login-user", userController.login);

// @route GET /create-language
// @description Get add language page
// @access Protected

// app.get("/create-language", authMiddleware, (req, res) => {
//   res.render("create-language", { errors: {} });
// });





app.listen(WEB_PORT, () => {
  console.log(
    `Example app listening at http://localhost:${WEB_PORT}`,
    
  );
});
