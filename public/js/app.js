const app               = angular.module('DadJokes', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.showLoginForm = true;
  this.userLoggedIn = false;
  this.currentJoke = {};
  this.loggedUser = {};
  this.allUsers = [];
  this.targetUser = {};
  this.targetMatchesLogged = false;

  // Get all jokes from my API
  this.getAllJokes = function(){
    $http({
      method: 'GET',
      url: '/jokes'
    }).then(
      function(res){
        console.log(res.data, 'response from this.getAllJokes');
      }, function(error){
        console.log(error, 'error from this.getAllJokes');
      })
  };

  // Get a count of jokes in my API
  this.countJokes = function(){
    $http({
      method: 'GET',
      url: '/jokes/count'
    }).then(function(res){
      console.log(res.data, 'response from this.countJokes');
    }, function(error){
      console.log(error, 'error from this.countJokes');
    })
  };

  //Get a count of all the jokes on the dad joke API
  this.countAPI = function(){
    $http({
      method: 'get',
      url: 'https://icanhazdadjoke.com/search',
      headers: {'Accept':'application/json'}
    }).then(
      function(response){
        console.log(res.data.total_jokes, 'response from this.countAPI');
      }, function (error){
        console.log(error, 'error from this.countAPI');
      }
    )
  };

  // Get a random joke from my API
  this.getRandomInternal = function(){
    $http({
      method: 'GET',
      url: '/jokes/random'
    }).then(function(res){
      console.log(res.data, 'response from this.getRandomInternal');
    }, function(error){
      console.log(error, 'error from this.getRandomJoke');
    })
  };

  // Get a random joke from the dad joke API
  this.getRandomExternal = function(){
    $http({
      method: 'GET',
      url: 'https://icanhazdadjoke.com/',
      headers: { 'Accept':'application/json'}
    }).then(function(res){
      // Is it possible to check the id of the joke against the ids of the jokes in the loggedUser's favorited jokes to change the class of the star appearing after the joke?
      // console.log(res.data, 'response from this.getRandomExternal')
      controller.currentJoke = res.data;
      // the api_id key of a joke is used for a common id system to put on a joke before getting a Mongo ID on the backend.
      controller.currentJoke.api_id = res.data.id;
      // console.log(controller.currentJoke, 'currentJoke')
    }, function(error){
      console.log(error, 'error from this.getRandomExternal')
    })
  };

  //Search API for dad jokes based on search term
  this.searchJokes = function(word){
    $http({
      method: 'GET',
      url: 'https://icanhazdadjoke.com/search?term=' + word,
      headers: { 'Accept':'application/json'}
    }).then(function(res){
      // Is it possible to check the ids of the jokes against the ids of the jokes in the loggedUser's favorited jokes to change the class of the star appearing after each joke?
      // To do this, it may be necessary to give each joke an id of the joke._id to find the target joke and apply the class change
      console.log(res.data, 'response from this.searchJokes');
    }, function(error){
      console.log(error, 'error from this.searchJokes');
    })
  };

  // Create a joke
  this.createJoke = function(num){
    console.log(this.loggedUser, 'logged user')
    $http({
      method: 'POST',
      url: '/jokes/' + this.loggedUser._id,
      data: {
        joke: this.createJokeText,
        api_id: this.generateRandomKey(),
        username: this.loggedUser.username
      }
    }).then(
      function(res){
        controller.createJokeText = '';
        controller.getAllUsers();
        controller.loggedUser = res.data;
        controller.loggedUser.logged = true;
        if (controller.targetMatchesLogged) {
          controller.targetUser = res.data;
        }
      }, function(error){
        console.log(error, 'error from this.createJoke');
      }
    )
  };

  // Get a particular joke
  this.getJoke = function(id){
    $http({
      method: 'GET',
      url: '/jokes/' + id
    }).then(function(res){
      console.log(res.data, 'response from this.getJoke');
    }, function(error){
      console.log(error, 'error from this.getJoke');
    })
  };

  this.openEditTab = function(id){
    // this.noOtherEdits is not listed in the controller, and is triggered when a user clicks the edit button for a joke.  Its purpose is to remove all edit buttons from jokes when a user is trying to edit a joke
    this.noOtherEdits = true;
    const $editLi = $('.created.' + id);
    const $newDiv = $('<div/>').addClass('editJoke');
    $editLi.append($newDiv);
  };

  // Delete a joke
  this.deleteJoke = function(id){
    console.log(id, 'joke id to be deleted')
    $http({
      method: 'DELETE',
      url: '/jokes/' + id
    }).then(function(res){
      console.log(res, 'response form this.deleteJoke');
      controller.loggedUser = res.data,
      controller.loggedUser.logged = true;
      controller.targetUser = controller.loggedUser;
    }, function(error){
      console.log(error, 'error from this.deleteJoke');
    })
  };

  // Create a user
  this.createUser = function(){
    // Use this route to check to verify that passwords match prior to sending the request.  If they don't match, pop up the error message to prompt the user for a match.  If they do match, send the $http request
    $http({
      method: 'POST',
      url: '/session',
      // data: this.newUser
      data: {
        firstName: 'Josh',
        lastName: 'Edgell',
        username: 'joshedgell',
        // They said my password need to be 8 characters, so I chose Snow White and the Seven Dwarves
        password: 'Tacocat1',
        password2: 'Tacocat1'
      }
    }).then(function(res){
      console.log(res.data, 'response from this.createUser');
      controller.loggedUser = res.data;
      controller.userLoggedIn = res.data.logged;
      controller.getAllUsers();
    }, function(error){
      console.log(error, 'error from this.createUser');
    })
  };

  // Get all users
  this.getAllUsers = function(){
    $http({
      method: 'GET',
      url: 'session'
    }).then(function(res){
      // console.log(res.data, 'response from this.getAllUsers');
      controller.allUsers = res.data;
    }, function(error){
      console.log(error, 'error from this.getAllUsers');
    })
  };

  //Get a specific user
  this.getUser = function(id){
    $http({
      method: 'GET',
      url: 'session/' + id
    }).then(function(res){
      console.log(res.data, 'response from this.getUser');
    }, function(error){
      console.log(error, 'error from this.getUser')
    })
  };

  // Delete a user
  this.deleteUser = function(id){
    $http({
      method: 'DELETE',
      url: 'session/' + id
    }).then(function(res){
      console.log(res.data, 'response from this.deleteUser');
      controller.getAllUsers();
    }, function(error){
      console.log(error, 'error from this.deleteUser');
    })
  };

  // Log in a user
  this.login = function(){
    this.showLoginForm = false;
    $http({
      method: 'POST',
      url: 'session/login',
      data: this.loginInfo,
      data: {
        username: 'joshedgell',
        password: 'Tacocat1'
      }
    }).then(function(res){
      if (res.status === 200) {
        controller.userLoggedIn = res.data.logged;
        controller.loggedUser = res.data;
        console.log(res, 'response from this.login')
        console.log('user logged in');
      }
      // console.log(res, 'response from this.login');
    }, function(error){
      // 401 - incorrect password
      // 404 - user not found
      console.log(error, 'error from this.login');
    })
  };

  this.logout = function(){
    $http({
      method: 'GET',
      url: 'session/logout',
    }).then(function(res){
      console.log(res.data, 'response from this.logout');
      controller.userLoggedIn = false;
    }, function(error){
      console.log(error, 'error from this.logout');
    })
  };

  this.displayUser = function(user) {
    console.log(user, 'clicked user');
    console.log(this.loggedUser);
    if (user._id === this.loggedUser._id) {
      console.log('target matches logged');
      this.targetMatchesLogged = true;
    }
    this.targetUser = user;
  };

  this.addJokeToFavorites = function(){
    this.targetMatchesLogged = true;
    this.loggedUser.favoriteJokes.push(this.targetJoke);
    $http({
      url: 'session/edit/' + this.loggedUser._id,
      method: 'PUT',
      data: this.loggedUser
    }).then(function(res){
      controller.getAllUsers();
      controller.loggedUser = res.data;
      controller.loggedUser.logged = true;
      if (controller.targetMatchesLogged) {
        controller.targetUser = res.data;
      }
      const $newDiv = $('<div/>').addClass('favoriteAdd').append($('<p/>').text('Favorited!'));
      $('.' + controller.targetJoke.api_id).removeClass('far').addClass('fas').append($newDiv);
      setTimeout(()=>{
        $('.favoriteAdd').remove();
      },1000);
    }, function(error){
      console.log(error, 'error from this.addJokeToFavorites');
    })
  };

  this.removeJokeFromFavorites = function(){
    const $foundLi = $('.' + this.targetJoke.api_id);
    console.log($foundLi, 'found li')
    for (let i = 0; i < this.loggedUser.favoriteJokes.length; i++) {
      if (this.targetJoke.api_id === this.loggedUser.favoriteJokes[i].api_id) {
        this.loggedUser.favoriteJokes.splice(i,1);
        i--;
      }
    }
    $http({
      url: 'session/edit/' + this.loggedUser._id,
      method: 'PUT',
      data: this.loggedUser
    }).then(function(res){
      controller.getAllUsers();
      controller.loggedUser = res.data;
      controller.loggedUser.logged = true;
      if (controller.targetMatchesLogged) {
        controller.targetUser = res.data;
      }
      const $newDiv = $('<div/>').addClass('favoriteAdd').append($('<p/>').text('Unfavorited'));
      $('.' + controller.targetJoke.api_id).removeClass('fas').addClass('far').append($newDiv);
      setTimeout(()=>{
        $('.favoriteAdd').remove();
      },1000);
    }, function(error){
      console.log(error, 'error from trying to remove joke from user favorites')
    })


  };

  this.favorite = function(joke){
    // Since this method receives the joke object that could be passed in either from a user's display modal or from a joke currently displayed on the main screen, this.targetJoke is defined here (it doesn't have a key in the controller) and will be used in both
    this.targetJoke = joke
    // If the user is not logged in, prompt the user to log in
    if (!this.loggedUser.logged) {
      console.log('user not logged in');
      const $newDiv = $('<div/>').addClass('favoriteAdd').append($('<p/>').text('Log in, please'));
      $('.' + controller.targetJoke.api_id).append($newDiv);
      setTimeout(()=>{
        $('.favoriteAdd').remove();
      },900);
      // This toggles the hamburger menu at the top of the page
      const hamburger = $('#hamburger');
      if (hamburger.attr('aria-expanded') === 'false') {
        hamburger.click();
      }
    } else {
      console.log('user logged in');
      // If the joke is not in the array, pass the joke id into the addJokeToFavorites method
      // Else, pass the joke id into the removeJokeFromFavorites method
      if (this.checkJokeAgainstUsersFavorites(this.targetJoke.api_id)) {
        this.removeJokeFromFavorites();
      } else {
        this.addJokeToFavorites();
      }
    }
  };

  this.checkJokeAgainstUsersFavorites = function(id){
    for (let i = 0; i < this.loggedUser.favoriteJokes.length; i++) {
      if (id === this.loggedUser.favoriteJokes[i].api_id) {
        return true;
      }
    }
    return false;
  };

  this.generateRandomKey = function(){
    // Generate a random, 11-digit key to assign to a joke when a user creates one
    let string = '';
    while (string.length < 11) {
      let number = Math.floor(Math.random() * 75 + 48);
      if ( !(57 < number && number < 65) && !(90 < number && number < 97) ) {
        string += String.fromCharCode(number);
      }
    }
    return string;
  };

  this.getRandomExternal();
  this.getAllUsers();
}]);
