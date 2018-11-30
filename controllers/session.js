const express           = require('express');
const bcrypt            = require('bcrypt');
const passwordValidator = require('password-validator');
const User              = require('../models/users.js');
const users             = require('../models/users.js');
const router            = express.Router();

const schema = new passwordValidator();

schema
  .is().min(8)
  .is().max(20)
  .has().uppercase()
  .has().digits()
  .has().not().spaces();

// Get all users
router.get('/', (req,res)=>{
  User.find({}, (err, foundUsers)=>{
    const users = [];
    for (let i = 0; i < foundUsers.length; i++) {
      users.push({
        _id: foundUsers[i]._id,
        username: foundUsers[i].username,
        firstName: foundUsers[i].firstName,
        lastName: foundUsers[i].lastName,
        favoriteJokes: foundUsers[i].favoriteJokes,
        createdJokes: foundUsers[i].createdJokes
      });
    }
    res.send(users);
  })
});

// Check password
router.post('/login', (req,res)=>{
  // console.log('login route accessed');
  User.findOne({ username: req.body.username }, (err,foundUser)=>{
    //If the user is found
    if (foundUser) {
      //If the provided password is correct
      if (bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.username = foundUser.username;
        req.session.firstName = foundUser.firstName;
        req.session.lastName = foundUser.lastName;
        req.session.favoriteJokes = foundUser.favoriteJokes;
        req.session.createdJokes = foundUser.createdJokes;
        req.session._id = foundUser._id
        // console.log(req.session.username + ' is logged in');
        // console.log(req.session);
        req.session.logged = true;
        res.send(req.session);

      //If the provided password is incorrect
      } else {
        res.sendStatus(401);
      }

    //If the user is not found
    } else {
      res.sendStatus(404);
    }
  })
});

// Logout
router.get('/logout', (req,res)=>{
  req.session.destroy((error)=>{
    if (error) {

    } else {
      // console.log('logged out');
      res.sendStatus(200);
    }
  })
});


// schema
//   .is().min(8)
//   .is().max(20)
//   .has().uppercase()
//   .has().digits()
//   .has().not().spaces();
//
// new passwordValidator().is().min(8).validate(req.body.password)

// Create new user
router.post('/', (req,res)=>{
  // req is sent to backend
  console.log(req.body);
  let errors = {
    'min': false,
    'max': false,
    'uppercase': false,
    'digit': false,
    'spaces': false,
    'errors': 5
  };
  if (new passwordValidator().is().min(8).validate(req.body.password)) {
    errors.min = true;
    errors.errors --;
  }
  if (new passwordValidator().is().max(20).validate(req.body.password)) {
    errors.max = true;
    errors.errors --;
  }
  if (new passwordValidator().has().uppercase().validate(req.body.password)) {
    errors.uppercase = true;
    errors.errors --;
  }
  if (new passwordValidator().has().digits().validate(req.body.password)) {
    errors.digit = true;
    errors.errors --;
  }
  if (new passwordValidator().has().not().spaces().validate(req.body.password)) {
    errors.spaces = true;
    errors.errors --;
  }





  // Response Area (res is the object that is sent back)
  if (errors.errors !== 0) {
    res.json(errors)
  } else {
    const userDbEntry = req.body;
    userDbEntry.password = bcrypt.hashSync(userDbEntry.password, bcrypt.genSaltSync(10));
    User.create(userDbEntry, (err,user)=>{
      console.log(user, 'created user');
      req.session.username = user.username;
      req.session.logged = true;
      req.session._id = user._id;
      req.session.firstName = user.firstName;
      req.session.lastName = user.lastName;
      req.session.favoritedJokes = [];
      req.session.createdJokes = [];
      res.send(req.session);
    })
  }









  // if (schema.validate(req.body.password)) {
  //   const userDbEntry = req.body;
  //   userDbEntry.password = bcrypt.hashSync(userDbEntry.password, bcrypt.genSaltSync(10));
  //   User.create(userDbEntry, (err,user)=>{
  //     req.session.username = user.username;
  //     req.session.logged = true;
  //     res.json(user);
  //   })
  // } else {
  //   res.sendStatus(400);
  // }



});

router.get('/dropdatabase',(req,res)=>{
  users.collection.drop();
  res.send('user database dropped');
});

// Get a specific user
router.get('/:id', (req,res)=>{
  User.findById(req.params.id,(err,foundUser)=>{
    res.send(foundUser);
  })
});

// Delete a user
router.delete('/:id', (req,res)=>{
  users.findByIdAndRemove(req.params.id, (error, deletedUser)=>{
    res.json(deletedUser);
  })
});

module.exports = router;
