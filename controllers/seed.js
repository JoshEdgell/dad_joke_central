const express     = require('express');
const router      = express.Router();
const joke        = require('../models/jokes.js')

const newJoke = [
  {
    joke: "I'm reading a book about anti-gravity.  It's impossible to put down."
  },
  {
    joke: "If you're American in the kitchen, what are you in the bathroom?  European."
  },
  {
    joke: "Did you know the first French fires weren't actually cooked in France?  They were cooked in Greece."
  },
  {
    joke: "Want to hear a joke about a piece of paper?  Never mind, it's tearable."
  },
  {
    joke: "If you see a robbery at an Apple store, does that make you an iWitness?"
  },
  {
    joke: "Spring is here!  I got so excited I wet my plants!"
  },
  {
    joke: "Did you hear about the guy who invented Lifesavers?  They say he made a mint."
  },
  {
    joke: "What do you call a factory that sells passable products?  A satisfactory."
  },
  {
    joke: "How do you make a Kleenex dance?  Put a little boogie in it."
  },
  {
    joke: "What kind of bees give milk?  Boo-bees."
  },
  {
    joke: "Why did the invisible man turn down the job offer?  He couldn't see himself doing it."
  },
  {
    joke: "A three-legged dog walks into a bar and says to the bartender: 'I'm looking for the man who shot my paw.'"
  },
  {
    joke: "5/4 of people admiot they're bad with fractions."
  },
  {
    joke: "What is Beethoven's favorite fruit?  A ba-na-na-na."
  },
  {
    joke: "Did you hear about the circus fire?  It was in tents."
  },
  {
    joke: "Don't trust atoms.  They make up everything."
  },
  {
    joke: "What do you get when you cross an elephant with a rhino?  Elephino."
  },
  {
    joke: "I'm only familiar with 25 letters in the alphabet.  I don't know why."
  },
  {
    joke: "Why couldn't the bike stand up by itself?  It was two tired."
  },
  {
    joke: "What do you call a dog that can do magic?  A Labracadabrador."
  },
  {
    joke: "What was a more important invention than the telephone?  The second one."
  },
  {
    joke: "Why didn't the vampire attack Taylor Swift?  She had bad blood."
  },
  {
    joke: "The fattest knight at King Arthur's round table was Sir Cumference.  He acquired his size from too much pi."
  },
  {
    joke: "Did you see they made round bails of hay illegal in Wisconsin?  None of the cows were getting a square meal."
  },
  {
    joke: "What do you call a fish with two legs?  A two-knee fish."
  },
  {
    joke: "What's the loudest pet you can get?  A trumpet."
  },
  {
    joke: "Where did the college-aged vampire like to shop?  Forever 21."
  },
  {
    joke: "How many apples grow on a tree?  All of them."
  },
  {
    joke: "How does a penguin build its house?  Igloos it together."
  },
  {
    joke: "Why don't skeletons ever go trick-or-treating?  Because they have no body to go with."
  },
  {
    joke: "Did you hear about the kidnapping at school?  It's fine, he woke up."
  },
  {
    joke: "I used to work in a shoe recycling shop.  It was sole-destroying."
  },
  {
    joke: "People don't like having to bend over to get their drinks.  We really need to raise the bar."
  },
  {
    joke: "You know, people say they pick their nose, but I was born with mine."
  },
  {
    joke: "I'm not indecisive.  Unless you want me to be."
  },
  {
    joke: "The only thing worse than having diarrhea is having to spell it."
  },
  {
    joke: "Did you hear about when the two antennas got married?  The ceremony was boring, but the reception was great!"
  },
  {
    joke: "If your nose runs and your feet smell, then you were built upside-down."
  },
  {
    joke: "An invisible man married an invisible woman.  Their children were nothing to look at, either."
  },
  {
    joke: "What do you call a group of killer whales playing instruments?  An Orca-stra."
  },
  {
    joke: "What did the baby corn say to the mama corn?  'Where's popcorn?'"
  },
  {
    joke: "Why don't seagulls fly over the bay?  Because then they'd be bay-gulls!"
  }
]

router.get('/', (req,res)=>{
  joke.create(newJoke, function(error){
    if (error) {
      console.log(error);
      res.send('seed data error');
    } else {
      console.log('seed executed');
      res.redirect('/');
    }
  })
});

router.get('/dropdatabase',(req,res)=>{
  joke.collection.drop();
  console.log('database dropped');
  res.redirect('/');
});

module.exports = router;
