const express         = require('express');
const jokes           = require('../models/jokes.js');
const User            = require('../models/users.js');
const router          = express.Router();

// Get all jokes
router.get('/', (req,res)=>{
  jokes.find({}, (error, jokes)=>{
    res.json(jokes);
  })
});

module.exports = router;
