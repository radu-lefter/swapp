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
      message: `could find taster ${id}.`,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const language = await Language.updateOne({ _id: id }, req.body);
    //console.log(req.body)
    res.redirect('/');
  } catch (e) {
    res.status(404).send({
      message: `could find taster ${id}.`,
    });
  }
}; 

// exports.createForm = async (req, res) => {
  
//   try {
//     const swadesh207 =["I","you (singular)","he","we","you (plural)","they","this","that","here","there","who","what","where","when","how","not","all","many","some","few","other","one","two","three","four","five","big","long","wide","thick","heavy","small","short","narrow","thin","woman","man (adult male)","man (human being)","child","wife","husband","mother","father","animal","fish","bird","dog","louse","snake","worm","tree","forest","stick","fruit","seed","leaf","root","bark (of a tree)","flower","grass","rope","skin","meat","blood","bone","fat (noun)","egg","horn","tail","feather","hair","head","ear","eye","nose","mouth","tooth","tongue (organ)","fingernail","foot","leg","knee","hand","wing","belly","guts","neck","back","breast","heart","liver","to drink","to eat","to bite","to suck","to spit","to vomit","to blow","to breathe","to laugh","to see","to hear","to know","to think","to smell","to fear","to sleep","to live","to die","to kill","to fight","to hunt","to hit","to cut","to split","to stab","to scratch","to dig","to swim","to fly","to walk","to come","to lie (as in a bed)","to sit","to stand","to turn (intransitive)","to fall","to give","to hold","to squeeze","to rub","to wash","to wipe","to pull","to push","to throw","to tie","to sew","to count","to say","to sing","to play","to float","to flow","to freeze","to swell","sun","moon","star","water","rain","river","lake","sea","salt","stone","sand","dust","earth","cloud","fog","sky","wind","snow","ice","smoke","fire","ashes","to burn","road","mountain","red","green","yellow","white","black","night","day","year","warm","cold","full","new","old","good","bad","rotten","dirty","straight","round","sharp (as a knife)","dull (as a knife)","smooth","wet","dry","correct","near","far","right","left","at","in","with","and","if","because","name"];
//     swadesh207.sort();
//     res.render('create-language', { swadesh207: swadesh207, errors:{} });
//   } catch (e) {
//     if (e.errors) {
//       console.log('here are our errors');
//       console.log(e.errors);
//       res.render('create-language', { errors: e.errors })
//       return;
//     }
//     res.status(404).send({
//       message: `could find language .`,
//     });
//   }
// };

exports.create = async (req, res) => {

  try {
    const language = new Language({ language: req.body.language,
                                    family: req.body.family,
                                    description: req.body.description,
                                    iso693: req.body.iso693,
                                    region: req.body.region,
                                    status: req.body.status, 
                                    speakers: req.body.speakers});
    await language.save();
    res.redirect('/')
  } catch (e) {
    if (e.errors) {
      console.log('here are our errors');
      console.log(e.errors);
      res.render('create-language', {errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
}



