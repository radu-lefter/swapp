const Language = require("../models/Language");

exports.list = async (req, res) => {
  const perPage = 10;
  const limit = parseInt(req.query.limit) || 10; // Make sure to parse the limit to number
  const page = parseInt(req.query.page) || 1;



  try {
    const languages = await Language.find({}).skip((perPage * page) - perPage).limit(limit);
    const count = await Language.find({}).count();
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
      message: `could find taster ${id}.`,
    });
  }
};



