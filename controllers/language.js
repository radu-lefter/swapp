const Language = require("../models/Language");

exports.list = async (req, res) => {
  const perPage = 12;
  const limit = parseInt(req.query.limit) || 12; // Make sure to parse the limit to number
  const page = parseInt(req.query.page) || 1;



  try {
    const languages = await Language.find({}).skip((perPage * page) - perPage).limit(limit);
    const count = await Language.find({}).countDocuments();
    const numberOfPages = Math.ceil(count / perPage);
    const message = req.query.message;

    res.render("index", {
      languages: languages,
      numberOfPages: numberOfPages,
      currentPage: page, 
      message: message
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
    res.status(404).send({ message: "could not list languages" });
  }
};

exports.view = async (req, res) => {
  const id = req.params.id;
  try {
    const language = await Language.findById(id);
    res.render('view-language', { language: language, id: id });
  } catch (e) {
    res.status(404).send({
      message: `could not find language with id ${id}.`,
    });
  }
};

exports.compare = async (req, res) => {
  const { lang1, lang2 } = req.query;
  const regex1 = new RegExp("^"+lang1, 'i');
  const regex2 = new RegExp("^"+lang2, 'i');

  if(lang1 === "" || lang2 === ""){
    res.render('select-languages', { errors: { message: 'You need to fill in the fields' } })
    return;
  }

  
  try {

    const languageOne = await Language.find({language: {$regex: regex1}});
    const languageTwo = await Language.find({language: {$regex: regex2}});

    
        res.render("compare-language", {
        languageOne: languageOne[0],
        languageTwo: languageTwo[0]
      });
    



    
  } catch (e) {
    res.status(404).send({ message: "could not list languages" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {

    await Language.findByIdAndRemove(id);
    res.redirect('/?message=Language successfully deleted!');
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
  const arr = ["all","and","animal","ashes","at","back","bad","bark (n)","because","belly","big","bird","black","blood","bone","breast","child","cloud","cold","correct","day","dirty","dog","dry","dull","dust","ear","earth","egg","eye","far","fat (n)","father","feather","few","fingernail","fire","fish","five","flower","fog","foot","forest","four","fruit","full","good","grass","green","guts","hair","hand","he/she","head","heart","heavy","here","horn","how","husband","I","ice","if","in","knee","lake","leaf","left","leg","liver","long","louse","man","many","meat","moon","mother","mountain","mouth","name","narrow","near","neck","new","night","nose","not","old","one","other","person","rain","red","right","river","road","root","rope","rotten","round","salt","sand","sea","seed","sharp","short","skin","sky","small","smoke","smooth","snake","snow","some","star","stick","stone","straight","sun","tail","that","there","they","they two","thick","thin","this","three","bite","blow","breathe","burn","come","count","cut","die","dig","drink","eat","fall","fear","fight","float","flow","fly (n)","fly (v)","freeze","give","hear","hit","hold","hunt","kill","know","laugh","lie","live","play","pull","push","rub","say","scratch","see","sew","sing","sit","sleep","smell","spit","split","squeeze","stab","stand","suck","swell","swim","think","throw","tie","turn","thou","tongue","tooth","tree","two","vomit","walk","wash","wipe","warm","water","we","we two","we (excl)","we (incl)","wet","what","when","where","white","who","wide","wife","wind","wing","with","woman","worm","year","yellow","you","you two","you (plural)","you (singular)"];
  const words = arr.reduce((acc,curr)=> (acc[curr]='',acc),{});
  //let words = {}
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
    res.redirect('/?message=Language successfully modified!');
  } catch (e) {
    res.status(404).send({
      message: `could not find taster ${id}.`,
    });
  }
}; 


exports.create = async (req, res) => {

  const arr = ["all","and","animal","ashes","at","back","bad","bark (n)","because","belly","big","bird","black","blood","bone","breast","child","cloud","cold","correct","day","dirty","dog","dry","dull","dust","ear","earth","egg","eye","far","fat (n)","father","feather","few","fingernail","fire","fish","five","flower","fog","foot","forest","four","fruit","full","good","grass","green","guts","hair","hand","he/she","head","heart","heavy","here","horn","how","husband","I","ice","if","in","knee","lake","leaf","left","leg","liver","long","louse","man","many","meat","moon","mother","mountain","mouth","name","narrow","near","neck","new","night","nose","not","old","one","other","person","rain","red","right","river","road","root","rope","rotten","round","salt","sand","sea","seed","sharp","short","skin","sky","small","smoke","smooth","snake","snow","some","star","stick","stone","straight","sun","tail","that","there","they","they two","thick","thin","this","three","bite","blow","breathe","burn","come","count","cut","die","dig","drink","eat","fall","fear","fight","float","flow","fly (n)","fly (v)","freeze","give","hear","hit","hold","hunt","kill","know","laugh","lie","live","play","pull","push","rub","say","scratch","see","sew","sing","sit","sleep","smell","spit","split","squeeze","stab","stand","suck","swell","swim","think","throw","tie","turn","thou","tongue","tooth","tree","two","vomit","walk","wash","wipe","warm","water","we","we two","we (excl)","we (incl)","wet","what","when","where","white","who","wide","wife","wind","wing","with","woman","worm","year","yellow","you","you two","you (plural)","you (singular)"];

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





