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

// Get a random joke
router.get('/random', (req,res)=>{
  jokes.find({}, (error, jokes)=>{
    res.json(jokes[Math.floor(Math.random() * jokes.length)]);
  })
})

// Create new joke
router.post('/', (req,res)=>{
  jokes.create(req.body, (error, newJoke)=>{
    res.json(newJoke);
  })
});

// Get a joke
router.get('/:id', (req,res)=>{
  jokes.find({ _id: req.params.id }, function(error, joke){
    res.send(joke);
  })
})

// Delete joke
router.delete('/:id', (req,res)=>{
  jokes.findByIdAndRemove(req.params.id, (error, deletedJoke)=>{
    res.json(deletedJoke);
  })
})


module.exports = router;
