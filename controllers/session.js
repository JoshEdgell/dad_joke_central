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
  let newUser = req.body;
  console.log(schema.validate(newUser.password, { list: true }))
})

module.exports = router;
