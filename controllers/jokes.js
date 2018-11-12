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

//Create nw Joke
router.post('/', (req,res)=>{
  jokes.create(req.body, (error, newJoke)=>{
    res.json(newJoke);
  })
})


module.exports = router;
