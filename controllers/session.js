const express           = require('express');
const bcrypt            = require('bcrypt');
const passwordValidator = require('password-validator');
const User              = require('../models/users.js');
const router            = express.Router();

const schema = new passwordValidator();

schema
  .is().min(8)
  .is().max(20)
  .has().uppercase()
  .has().digits()
  .has().not().spaces();

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
})

module.exports = router;
