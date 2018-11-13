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
    res.json(users);
  })
});

// Check password
router.post('/login', (req,res)=>{
  console.log('login route accessed');
  User.findOne({ username: req.body.username }, (err,foundUser)=>{
    //If the user is found
    if (foundUser) {
      //If the provided password is correct
      if (bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.username = req.body.username;
        console.log(req.session.username + ' is logged in');
        console.log(req.session);
        req.session.logged = true;
      } else {
        console.log('incorrect password');
      }
    //If the user is not found
    } else {
      console.log('user not found');
    }
  })
});

// Create new user
router.post('/', (req,res)=>{
  if (schema.validate(req.body.password)) {
    if (req.body.password !== req.body.password2) {
      console.log('passwords do not match');
    } else {
      const userDbEntry = req.body;
      userDbEntry.password = bcrypt.hashSync(userDbEntry.password, bcrypt.genSaltSync(10));
      User.create(userDbEntry, (err,user)=>{
        req.session.username = user.username;
        req.session.logged = true;
        res.json(user);
      })
    }
  } else {
    console.log('the password is invalid');
  }
});

// Delete a user
router.delete('/:id', (req,res)=>{
  users.findByIdAndRemove(req.params.id, (error, deletedUser)=>{
    res.json(deletedUser);
  })
});

module.exports = router;
