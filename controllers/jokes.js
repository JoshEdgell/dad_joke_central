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

// Count the number of jokes
router.get('/count', (req,res)=>{
  jokes.countDocuments(function(error, count){
    res.send(count.toString());
  })
});

// Get a random joke
router.get('/random', (req,res)=>{
  jokes.find({}, (error, jokes)=>{
    res.json(jokes[Math.floor(Math.random() * jokes.length)]);
  })
});

// Create new joke
router.post('/:id', (req,res)=>{
  jokes.create(req.body, (error, newJoke)=>{
    User.findById(req.params.id, (error, foundUser)=>{
      foundUser.createdJokes.push(newJoke);
      foundUser.favoriteJokes.push(newJoke);
      foundUser.save((error, data)=>{
        res.json(data);
      })
    });
  })
});

// Drop database (REMOVE BEFORE DEPLOY)
router.get('/dropdatabase',(req,res)=>{
  jokes.collection.drop();
  res.send('joke database dropped');
});

// Get a joke
router.get('/:id', (req,res)=>{
  jokes.find({ _id: req.params.id }, function(error, joke){
    res.send(joke);
  })
});

// Edit joke (have to check, also have to edit joke in User's created jokes, as well as in favorited jokes for users)
router.put('/:id', (req,res)=>{
  jokes.findByIdAndUpdate(req.params.id, req.body, { new: true },
  (err, update)=>{
    res.json(update);
  })
});

// Delete joke
router.delete('/:id', (req,res)=>{
  jokes.findByIdAndRemove({'_id': req.params.id}, (error, foundJoke)=>{
    User.findOne({'createdJokes._id': req.params.id}, (error, foundUser)=>{
      foundUser.createdJokes.id(req.params.id).remove();
      foundUser.favoriteJokes.id(req.params.id).remove();
      foundUser.save((error, data)=>{
        console.log(foundJoke, 'found joke');
        console.log(foundUser, 'found user');
        res.json(data);
      })
    })
  })
});


module.exports = router;
