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
    const userArray = [];
    for (let i = 0; i < foundUsers.length; i++) {
      userArray.push({
        _id: foundUsers[i]._id,
        username: foundUsers[i].username,
        firstName: foundUsers[i].firstName,
        lastName: foundUsers[i].lastName,
        favoriteJokes: foundUsers[i].favoriteJokes,
        createdJokes: foundUsers[i].createdJokes
      });
    }
    res.send(userArray);
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

    const userDbEntry = req.body;
    userDbEntry.password = bcrypt.hashSync(userDbEntry.password, bcrypt.genSaltSync(10));
    User.create(userDbEntry, (err,user)=>{
      // console.log(user, 'created user');
      req.session.username = user.username;
      req.session.logged = true;
      req.session._id = user._id;
      req.session.firstName = user.firstName;
      req.session.lastName = user.lastName;
      req.session.favoritedJokes = [];
      req.session.createdJokes = [];
      res.send(req.session);
    })



});

// Edit a user
router.put('/edit/:id', (req,res)=>{
  User.findOneAndUpdate( { _id: req.body._id}, req.body, {new:true}, (err,updatedUser)=>{
    if (err) {
      console.log(err);
    }
    res.json(updatedUser);
  })

  // User.findOne({ '_id': req.body._id}, (err, updatedUser)=>{
  //
  // })
});

// Drop database (REMOVE BEFORE DEPLOY)
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
  users.findOneAndDelete(req.params.id, (error, deletedUser)=>{
    res.json(deletedUser);
  })
});

module.exports = router;
