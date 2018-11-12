const mongoose  = require('mongoose');
const Joke      = require('./jokes.js');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  favoriteJokes: [Joke.schema],
  createdJokes: [Joke.schema]
});

const user = mongoose.model('user',userSchema);

module.exports = user;
