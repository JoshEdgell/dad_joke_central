const express             = require('express');
const bodyParser          = require('body-parser');
const mongoose            = require('mongoose');
const methodOverride      = require('method-override');
const app                 = express();
const router              = express.Router();


// Middleware
app.use(methodOverride('_method'));
app.use(express.static('public'));
//Next line may not be necessary
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
  res.render(index.html);
});

// Controllers
const jokeController = require('./controllers/jokes.js');
app.use('/jokes', jokeController);

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dad_jokes'
mongoose.connect(mongoUri, { useNewUrlParser: true});

mongoose.connection.once('open', ()=>{
  console.log('I walked into a zoo that only had one animal, a dog.  It was a shitzu.');
});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log('What was a more important invention than the telephone?  The second one.');
  console.log('========== PORT ' + port + ' ===============')
})
