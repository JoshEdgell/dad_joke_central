const mongoose  = require('mongoose');
const Joke      = require('./jokes.js');

const userSchema = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  favoriteJokes: [Joke.schema],
  createdJokes: [Joke.schema],
  password: String
});

const user = mongoose.model('user',userSchema);

module.exports = user;