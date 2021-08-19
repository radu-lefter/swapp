const Language = require("../models/Language");

exports.list = async (req, res) => {
  const perPage = 12;
  const limit = parseInt(req.query.limit) || 12; // Make sure to parse the limit to number
  const page = parseInt(req.query.page) || 1;



  try {
    const languages = await Language.find({}).skip((perPage * page) - perPage).limit(limit);
    const count = await Language.find({}).countDocuments();
    const numberOfPages = Math.ceil(count / perPage);

    res.render("index", {
      languages: languages,
      numberOfPages: numberOfPages,
      currentPage: page
    });
  } catch (e) {
    res.status(404).send({ message: "could not list languages" });
  }
};

exports.search = async (req, res) => {

  const perPage = 30;
  const limit = parseInt(req.query.limit) || 30; // Make sure to parse the limit to number
  const page = parseInt(req.query.page) || 1;
  const { langName } = req.query;
  const regex = new RegExp("^"+langName, 'i');
  var numberOfPages = 0;

  try {

    const languages = await Language.find({language: {$regex: regex}}).skip((perPage * page) - perPage).limit(limit);
    const count = await Language.find({language: {$regex: regex}}).countDocuments();
    if(count < perPage){
      numberOfPages = 1;
    }else{
      numberOfPages = Math.ceil(count / perPage);
    }
    

    res.render("index", {
      languages: languages,
      numberOfPages: numberOfPages,
      currentPage: page
    });
  } catch (e) {
    res.status(404).send({ message: "could not list languagessssssssssss" });
  }
};

exports.view = async (req, res) => {
  const id = req.params.id;
  try {
    const language = await Language.findById(id);
    res.render('view-language', { language: language, id: id });
  } catch (e) {
    res.status(404).send({
      message: `could find language with id ${id}.`,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {

    await Language.findByIdAndRemove(id);
    res.redirect("/");
  } catch (e) {
    res.status(404).send({
      message: `could not delete  record ${id}.`,
    });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const language = await Language.findById(id);
    res.render('update-language', { language: language, id: id, errors: {} });
  } catch (e) {
    if (e.errors) {
      console.log('here are our errors');
      console.log(e.errors);
      res.render('update-language', {errors: e.errors })
      return;
    }
    res.status(404).send({
      message: `could not find taster ${id}.`,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const arr = ["all","and","animal","ashes","at","back","bad","bark (of a tree)","because","belly","big","bird","black","blood","bone","breast","child","cloud","cold","correct","day","dirty","dog","dry","dull (as a knife)","dust","ear","earth","egg","eye","far","fat (noun)","father","feather","few","fingernail","fire","fish","five","flower","fog","foot","forest","four","fruit","full","good","grass","green","guts","hair","hand","he","head","heart","heavy","here","horn","how","husband","I","ice","if","in","knee","lake","leaf","left","leg","liver","long","louse","man (adult male)","man (human being)","many","meat","moon","mother","mountain","mouth","name","narrow","near","neck","new","night","nose","not","old","one","other","rain","red","right","river","road","root","rope","rotten","round","salt","sand","sea","seed","sharp (as a knife)","short","skin","sky","small","smoke","smooth","snake","snow","some","star","stick","stone","straight","sun","tail","that","there","they","thick","thin","this","three","to bite","to blow","to breathe","to burn","to come","to count","to cut","to die","to dig","to drink","to eat","to fall","to fear","to fight","to float","to flow","to fly","to freeze","to give","to hear","to hit","to hold","to hunt","to kill","to know","to laugh","to lie (as in a bed)","to live","to play","to pull","to push","to rub","to say","to scratch","to see","to sew","to sing","to sit","to sleep","to smell","to spit","to split","to squeeze","to stab","to stand","to suck","to swell","to swim","to think","to throw","to tie","to turn (intransitive)","to vomit","to walk","to wash","to wipe","tongue (organ)","tooth","tree","two","warm","water","we","wet","what","when","where","white","who","wide","wife","wind","wing","with","woman","worm","year","yellow","you (plural)","you (singular)"];
  let words = {}
  Object.keys(req.body).forEach(key => { if (arr.includes(key)) words[key] = req.body[key] });
  //req.body
  try {
    const language = await Language.updateOne({ _id: id }, {$set: {"language":req.body.language,
                                                                   "iso693":req.body.iso693,
                                                                   "description":req.body.description,
                                                                   "status":req.body.status,
                                                                   "speakers":req.body.speakers,
                                                                   "region":req.body.region,
                                                                   "family":req.body.family,
                                                                    words: words}});

    //console.log(req.body) 
    res.redirect("/");
  } catch (e) {
    res.status(404).send({
      message: `could not find taster ${id}.`,
    });
  }
}; 


exports.create = async (req, res) => {

  const arr = ["all","and","animal","ashes","at","back","bad","bark (of a tree)","because","belly","big","bird","black","blood","bone","breast","child","cloud","cold","correct","day","dirty","dog","dry","dull (as a knife)","dust","ear","earth","egg","eye","far","fat (noun)","father","feather","few","fingernail","fire","fish","five","flower","fog","foot","forest","four","fruit","full","good","grass","green","guts","hair","hand","he","head","heart","heavy","here","horn","how","husband","I","ice","if","in","knee","lake","leaf","left","leg","liver","long","louse","man (adult male)","man (human being)","many","meat","moon","mother","mountain","mouth","name","narrow","near","neck","new","night","nose","not","old","one","other","rain","red","right","river","road","root","rope","rotten","round","salt","sand","sea","seed","sharp (as a knife)","short","skin","sky","small","smoke","smooth","snake","snow","some","star","stick","stone","straight","sun","tail","that","there","they","thick","thin","this","three","to bite","to blow","to breathe","to burn","to come","to count","to cut","to die","to dig","to drink","to eat","to fall","to fear","to fight","to float","to flow","to fly","to freeze","to give","to hear","to hit","to hold","to hunt","to kill","to know","to laugh","to lie (as in a bed)","to live","to play","to pull","to push","to rub","to say","to scratch","to see","to sew","to sing","to sit","to sleep","to smell","to spit","to split","to squeeze","to stab","to stand","to suck","to swell","to swim","to think","to throw","to tie","to turn (intransitive)","to vomit","to walk","to wash","to wipe","tongue (organ)","tooth","tree","two","warm","water","we","wet","what","when","where","white","who","wide","wife","wind","wing","with","woman","worm","year","yellow","you (plural)","you (singular)"];

  let words = {}
  Object.keys(req.body).forEach(key => { if (arr.includes(key)) words[key] = req.body[key] });
  try {
  
    const language = new Language({ language: req.body.language,
                                    family: req.body.family,
                                    description: req.body.description,
                                    iso693: req.body.iso693,
                                    region: req.body.region,
                                    status: req.body.status, 
                                    speakers: req.body.speakers,
                                    words: words});
    await language.save();
    res.redirect("/");
  } catch (e) {
    if (e.errors) {
      console.log('here are our errors');
      console.log(e.errors);
      res.render('create-language', {errors: e.errors, swadesh207:arr })
      return;
    }
    return res.status(400).send({
      message: `could not create new list`,
    });
  }
}



