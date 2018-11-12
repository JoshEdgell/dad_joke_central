const mongoose  = require('mongoose');

const jokeSchema = mongoose.Schema({
  api_id: String,
  userName: String,
  joke: String
});

const joke = mongoose.model('joke', jokeSchema);

module.exports = joke;
