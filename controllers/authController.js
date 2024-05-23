const jwt = require('jsonwebtoken');
const User = require('../models/user');
const express = require('express');
const app = express();
// const passport = require('./config/passport');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: '', password: '' };

  // incorrect username
  if (err.message === 'incorrect username') {
    errors.username = 'incorrect username or password';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'incorrect username or password';
  }

  // duplicate username error
  if (err.code === 11000) {
    errors.username = 'that username is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

module.exports.signup_get = function(req, res) {
    res.render('./signup');
  };
module.exports.signup_post = async(req, res) =>{
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    roles: req.body.roles
  });
  try {
    await User.create(newUser);
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send("error, user not created!")
  }
};

module.exports.login_get = function(req, res) {
    // let newUser = new User({
    //   username: req.body.username,
    //   password: req.body.password
    // });
    // newUser.save(err => {
    //   if (err) return res.status(500).send("Error registering new user.");
    //   res.status(200).send("Registration successful!");
    // });
    res.render('./login');
  };

// module.exports.login_post = function(req, res) {
// //   User.findOne({ username: req.body.username }, function(err, user) {
// //     if (err) throw err;
// //     if (!user || !user.comparePassword(req.body.password)) {
// //       return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
// //     }
// //     return res.json({ token: jwt.sign({ username: user.username, _id: user._id }, 'RESTFULAPIs') });
// //   });


// // passport.authenticate('local', { session: false }, (err, user, info) => {
// //     if (err || !user) {
// //       return res.status(400).json({
// //         message: info ? info.message : 'Login failed',
// //         user: user
// //       });
// //     }
// //     req.login(user, { session: false }, (err) => {
// //       if (err) {
// //         res.send(err);
// //       }
// //       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
// //       return res.json({ user, token });
// //     });
// //   })(req, res);
// res.status(200).send("Registration successful!");
// };

module.exports.login_post = async (req, res) => {
 

  try {
    let _user = new User({
      username: req.body.username,
      password: req.body.password,
      roles: req.body.roles
    });
    const user = await User.login(_user.username, _user.password);
   // const token = createToken(user._id);
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
   res.status(200).json({ user: user._id });
  //  app.get('/dashboard', function (req, res) {
    //  res.redirect('/dashboard');
//  });
   
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
  //next();
}