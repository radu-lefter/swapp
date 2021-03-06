require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const User = require("./models/User");
const expressSession = require("express-session");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


/**
 * Controllers (route handlers).
 */

  const userController = require("./controllers/user");
  const languageController = require("./controllers/language");
 
 const app = express();
 app.set("view engine", "ejs");

 //let swadesh207 = ["I","you (singular)","he","we","you (plural)","they","this","that","here","there","who","what","where","when","how","not","all","many","some","few","other","one","two","three","four","five","big","long","wide","thick","heavy","small","short","narrow","thin","woman","man (adult male)","man (human being)","child","wife","husband","mother","father","animal","fish","bird","dog","louse","snake","worm","tree","forest","stick","fruit","seed","leaf","root","bark (of a tree)","flower","grass","rope","skin","meat","blood","bone","fat (noun)","egg","horn","tail","feather","hair","head","ear","eye","nose","mouth","tooth","tongue (organ)","fingernail","foot","leg","knee","hand","wing","belly","guts","neck","back","breast","heart","liver","to drink","to eat","to bite","to suck","to spit","to vomit","to blow","to breathe","to laugh","to see","to hear","to know","to think","to smell","to fear","to sleep","to live","to die","to kill","to fight","to hunt","to hit","to cut","to split","to stab","to scratch","to dig","to swim","to fly","to walk","to come","to lie (as in a bed)","to sit","to stand","to turn (intransitive)","to fall","to give","to hold","to squeeze","to rub","to wash","to wipe","to pull","to push","to throw","to tie","to sew","to count","to say","to sing","to play","to float","to flow","to freeze","to swell","sun","moon","star","water","rain","river","lake","sea","salt","stone","sand","dust","earth","cloud","fog","sky","wind","snow","ice","smoke","fire","ashes","to burn","road","mountain","red","green","yellow","white","black","night","day","year","warm","cold","full","new","old","good","bad","rotten","dirty","straight","round","sharp (as a knife)","dull (as a knife)","smooth","wet","dry","correct","near","far","right","left","at","in","with","and","if","because","name"];
 //swadesh207.sort();
 //app.locals.swa207 = swadesh207;

 
 /**
 * pulling the values from our environment
 */

const { PORT, MONGODB_URI } = process.env;

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

 app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

 app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) }, resave: true,
 saveUninitialized: true }))



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
     return res.redirect('/?message=You need to be logged in in order to perform this action!');
   }
   next()
 }

// @route GET /
// @description Get home page and all languages
// @access Public

app.get("/", languageController.list);


app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

// @route GET /search
// @description Get languages by language name
// @access Public
app.get("/search", languageController.search);


// @route GET /view/:id
// @description Get one language by id
// @access Public
app.get("/view/:id", languageController.view);



// @route GET /about
// @description Get about page
// @access Public

app.get("/about", (req, res) => {
  res.render("about");
});

 
// @route GET /join
// @description Get registration page
// @access Public
app.get("/join", (req, res) => {
  res.render("create-user", { errors: {}});
});

// @route POST /create-user
// @description Create a new user
// @access Public
app.post("/create-user", userController.create);

// @route GET /login
// @description Get login page
// @access Public

app.get("/login", (req, res) => {
  res.render("login-user", { errors: {}});
});

// @route POST /login-user
// @description Send login info
// @access Public
app.post("/login-user", userController.login);

// @route GET /create-language
// @description Get add language page
// @access Protected

app.get("/create-language", authMiddleware, (req, res) => {
  var swadesh207 = ["all","and","animal","ashes","at","back","bad","bark (n)","because","belly","big","bird","black","blood","bone","breast","child","cloud","cold","correct","day","dirty","dog","dry","dull","dust","ear","earth","egg","eye","far","fat (n)","father","feather","few","fingernail","fire","fish","five","flower","fog","foot","forest","four","fruit","full","good","grass","green","guts","hair","hand","he/she","head","heart","heavy","here","horn","how","husband","I","ice","if","in","knee","lake","leaf","left","leg","liver","long","louse","man","many","meat","moon","mother","mountain","mouth","name","narrow","near","neck","new","night","nose","not","old","one","other","person","rain","red","right","river","road","root","rope","rotten","round","salt","sand","sea","seed","sharp","short","skin","sky","small","smoke","smooth","snake","snow","some","star","stick","stone","straight","sun","tail","that","there","they","they two","thick","thin","this","three","bite","blow","breathe","burn","come","count","cut","die","dig","drink","eat","fall","fear","fight","float","flow","fly (n)","fly (v)","freeze","give","hear","hit","hold","hunt","kill","know","laugh","lie","live","play","pull","push","rub","say","scratch","see","sew","sing","sit","sleep","smell","spit","split","squeeze","stab","stand","suck","swell","swim","think","throw","tie","turn","thou","tongue","tooth","tree","two","vomit","walk","wash","wipe","warm","water","we","we two","we (excl)","we (incl)","wet","what","when","where","white","who","wide","wife","wind","wing","with","woman","worm","year","yellow","you","you two","you (plural)","you (singular)"];
  //console.log(swadesh207.length);
  res.render("create-language", { errors: {}, swadesh207: swadesh207 });
});


// @route POST /create-language
// @description Add a language
// @access Protected
app.post("/create-language", languageController.create);



// @route GET /view/delete/:id
// @description Delete language
// @access Protected

app.get("/view/delete/:id", authMiddleware, languageController.delete);

// @route GET /view/update/:id
// @description Update language
// @access Protected

app.get("/view/update/:id", authMiddleware, languageController.edit);

// @route POST /view/update/:id
// @description Update language
// @access Protected

app.post("/view/update/:id", languageController.update);

// @route GET /select-languages
// @description Get compare languages form
// @access Public
app.get("/select-languages", (req, res) => {
 
  res.render("select-languages", { errors: {}});
});

// @route GET /compare-languages
// @description Get two languages
// @access Public
app.get("/compare-language", languageController.compare);


app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT}`,
    
  );
});
