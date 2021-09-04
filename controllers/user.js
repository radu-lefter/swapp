const User = require("../models/User");
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {

    try {
      if(req.body.email === "" || req.body.password === ""){
           res.render('create-user', { errors: { email: { message: 'Email or password cannot be empty' } } })
           return;
      }
      const user = new User({ email: req.body.email, password: req.body.password });
      await user.save();
      res.redirect('/')
    } catch (e) {
      if (e.errors) {
        console.log('here are our errors');
        console.log(e.errors);
        res.render('create-user', { errors: e.errors })
        return;
      }
      return res.status(400).send({
        message: JSON.parse(e),
      });
    }
  }

  exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.render('login-user', { errors: { email: { message: 'Email or password does not match' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        
        if (match) {
          req.session.userID = user._id;
          console.log(req.session.userID);
          res.redirect('/');
          return
        }
        
        //res.render('login-user', { errors: { password: { message: 'password does not match' } } })

        


    } catch (e) {
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}