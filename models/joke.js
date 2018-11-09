const mongoose  = require('mongoose');

const jokeSchema = mongoose.Schema({
  api_id: String,
  userName: String,
  joke: String
});

const jokes = mongoose.model('joke', jokeSchema);

module.exports = joke;
